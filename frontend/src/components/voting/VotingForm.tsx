"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useToast } from "../../components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { getPartidos, postVoto } from "../../services/api";

type Partido = {
  _id: string;
  nombre: string;
  sigla: string;
  color: string;
  logo?: string;
};

// Obtener provincias desde la API
export async function getProvincias() {
  const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/provincias`);
  if (!res.ok) throw new Error('Error al cargar provincias');
  return res.json();
}

export async function getLocalidades(provincia: string) {
  if (!provincia) return [];
  const res = await fetch(
    `${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/localidades?provincia=${encodeURIComponent(provincia)}`
  );
  if (!res.ok) throw new Error('Error al cargar localidades');
  return res.json();
}

// Obtener escuelas
const getEscuelas = async (localidad: string) => {
  // En un caso real, harías una llamada a tu API
  return [
    { id: '1', nombre: `Escuela en ${localidad} 1` },
    { id: '2', nombre: `Escuela en ${localidad} 2` },
  ];
};

// Form validation schema
const formSchema = z.object({
  provincia: z.string().min(1, "Selecciona una provincia"),
  localidad: z.string().min(1, "Selecciona una localidad"),
  escuela: z.string().min(1, "Selecciona una escuela"),
  mesa: z.string().min(1, "Ingresa el número de mesa"),
  partido: z.string().min(1, "Selecciona un partido político"),
  comentarios: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function VotingForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPartidos, setIsLoadingPartidos] = useState(true);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [localidades, setLocalidades] = useState<Array<{ _id: string; nombre: string }>>([]);
  const [escuelas, setEscuelas] = useState<Array<{ id: string; nombre: string }>>([]);
  const [provincias, setProvincias] = useState<Array<{ _id: string; nombre: string }>>([]);
  const navigate = useNavigate();
  
  // Inicializar el formulario
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provincia: "",
      localidad: "",
      escuela: "",
      mesa: "",
      partido: "",
      comentarios: "",
    },
  });
  
  // Cargar provincias al montar el componente
  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const data = await getProvincias();
        setProvincias(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las provincias',
          variant: 'destructive',
        });
      }
    };
    
    fetchProvincias();
  }, [toast]);
  
  // Cargar partidos al montar el componente
  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const data = await getPartidos();
        setPartidos(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los partidos políticos',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingPartidos(false);
      }
    };
    
    fetchPartidos();
  }, [toast]);
  
  // Cargar localidades cuando cambia la provincia
  useEffect(() => {
    const fetchLocalidades = async () => {
      const provincia = form.getValues('provincia');
      if (provincia) {
        try {
          const data = await getLocalidades(provincia);
          setLocalidades(data);
          form.setValue('localidad', '');
          form.setValue('escuela', '');
          setEscuelas([]);
        } catch (error) {
          toast({
            title: 'Error',
            description: 'No se pudieron cargar las localidades',
            variant: 'destructive',
          });
        }
      }
    };
    
    fetchLocalidades();
  }, [form, form.watch('provincia'), toast]);
  
  // Cargar escuelas cuando cambia la localidad
  useEffect(() => {
    const fetchEscuelas = async () => {
      const localidad = form.getValues('localidad');
      if (localidad) {
        try {
          const data = await getEscuelas(localidad);
          setEscuelas(data);
          form.setValue('escuela', '');
        } catch (error) {
          toast({
            title: 'Error',
            description: 'No se pudieron cargar las escuelas',
            variant: 'destructive',
          });
        }
      }
    };
    
    fetchEscuelas();
  }, [form, form.watch('localidad'), toast]);
  
  const hasVoted = localStorage.getItem('hasVoted') === 'true';

  useEffect(() => {
    if (hasVoted) {
      toast({
        title: "Ya has votado",
        description: "Solo se permite un voto por dispositivo.",
        variant: "destructive",
        duration: 5000
      });
      navigate('/resultados');
    }
  }, [hasVoted, navigate, toast]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (hasVoted) {
        throw new Error('Ya has votado desde este dispositivo');
      }

      console.log('Iniciando envío del formulario con datos:', data);
      setIsLoading(true);
      
      // Obtener el partido seleccionado por sigla
      console.log('Buscando partido con sigla:', data.partido);
      console.log('Todos los partidos disponibles:', partidos);
      
      const selectedParty = partidos.find((p: Partido) => p.sigla === data.partido);
      if (!selectedParty) {
        console.error('No se encontró el partido con sigla:', data.partido);
        throw new Error('Partido político no válido');
      }

      console.log('Partido seleccionado:', selectedParty);

      // Construir el objeto de voto
      const votoData = {
        mesa: data.mesa,
        provincia: data.provincia,
        localidad: data.localidad,
        partidoSigla: selectedParty.sigla, // Usamos la sigla como identificador
        cantidad: 1 // Cada voto cuenta como 1
      };

      console.log('Datos del voto a enviar:', votoData);
      
      // Llamar a la API
      console.log('Enviando voto al servidor...');
      const response = await postVoto(votoData);
      
      console.log("Respuesta del servidor:", response);
      
      // Marcar como que ya votó
      localStorage.setItem('hasVoted', 'true');
      
      // Mostrar mensaje de éxito
      toast({
        title: "¡Voto registrado exitosamente!",
        description: "Gracias por participar. Redirigiendo a los resultados...",
        duration: 5000,
      });
      
      // Redirigir a la página de resultados después de un breve retraso
      setTimeout(() => {
        navigate('/resultados');
      }, 2000);
    } catch (error: any) {
      console.error("Error al registrar el voto:", error);
      
      // Mostrar mensaje de error
      toast({
        title: "Error al registrar el voto",
        description: error.message || "Ocurrió un error al procesar tu voto. Por favor, inténtalo de nuevo.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Provincia */}
            <FormField
              control={form.control}
              name="provincia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Provincia</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("localidad", "");
                    }}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecciona una provincia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white z-50">
                      {provincias.map((provincia) => (
                        <SelectItem 
                          key={provincia._id} 
                          value={provincia.nombre}
                          className="hover:bg-gray-100 cursor-pointer"
                        >
                          {provincia.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            {/* Localidad */}
            <FormField
              control={form.control}
              name="localidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Localidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    disabled={!form.watch('provincia')}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={
                          form.watch('provincia') 
                            ? "Selecciona una localidad" 
                            : "Primero selecciona una provincia"
                        } />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white z-50">
                      {localidades.length > 0 ? (
                        localidades.map((localidad) => (
                          <SelectItem 
                            key={localidad._id} 
                            value={localidad.nombre}
                            className="hover:bg-gray-100 cursor-pointer"
                          >
                            {localidad.nombre}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem 
                          value="no-province" 
                          disabled
                          className="text-gray-400 cursor-not-allowed"
                        >
                          {form.watch('provincia') 
                            ? "Cargando localidades..." 
                            : "Selecciona una provincia primero"}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Escuela */}
            <FormField
              control={form.control}
              name="escuela"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Escuela</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || ""}
                    disabled={!form.watch('localidad')}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={
                          form.watch('localidad')
                            ? "Selecciona una escuela"
                            : "Primero selecciona una localidad"
                        } />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white z-50">
                      {escuelas.length > 0 ? (
                        escuelas.map((escuela) => (
                          <SelectItem 
                            key={escuela.id} 
                            value={escuela.nombre}
                            className="hover:bg-gray-100 cursor-pointer"
                          >
                            {escuela.nombre}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem 
                          value="no-escuela"
                          disabled
                          className="text-gray-400 cursor-not-allowed"
                        >
                          {form.watch('localidad')
                            ? "Cargando escuelas..."
                            : "Selecciona una localidad primero"}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Partido Político */}
          <div className="pt-2">
            <FormField
              control={form.control}
              name="partido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Partido Político</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecciona un partido político" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white z-50">
                      {isLoadingPartidos ? (
                        <div className="p-2 text-center">
                          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                          <p className="text-sm text-muted-foreground mt-1">Cargando partidos...</p>
                        </div>
                      ) : partidos.length > 0 ? (
                        partidos.map((party) => (
                          <SelectItem 
                            key={party._id} 
                            value={party.sigla}
                            className="hover:bg-gray-100 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              {party.logo && (
                                <img 
                                  src={party.logo} 
                                  alt={party.nombre} 
                                  className="h-5 w-5 object-contain" 
                                />
                              )}
                              <span>{party.nombre}</span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-center">
                          <p className="text-sm text-muted-foreground">No hay partidos disponibles</p>
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Comentario */}
          <FormField
            control={form.control}
            name="comentarios"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Comentario (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="¿Algún comentario u observación sobre tu experiencia de votación?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Botón de envío */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando voto...
                </>
              ) : (
                'Registrar mi voto'
              )}
            </Button>
          </div>
        </form>
      </Form>
      
      {/* Mensaje de privacidad */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">

          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Tu privacidad está protegida</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>No almacenamos información personal. Tu voto es completamente anónimo y seguro.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
