import { z } from "zod";

// Esquema para repartidor
const repartidorSchema = z.object({
    nombre_repartidor: z.string().min(1),
    telefono_repartidor: z.string().regex(/^\d+$/, "El teléfono debe contener solo números"),
    vehiculo_repartidor: z.enum(["bicicleta", "motocicleta", "automóvil"]),
    disponible_repartidor: z.boolean(),
    coordinates_repartidor: z.array(z.number()).length(2)
    
});

// Esquema para restaurante
const restauranteSchema = z.object({
    nombre_restaurante: z.string().min(1),
    direccion_restaurante: z.string().regex(/^[a-zA-Z0-9\s\#\-\.\,]+$/, "La dirección contiene caracteres inválidos"),
    categoria_restaurante: z.string().min(1),
    coordinates_restaurante: z.array(z.number()).length(2)
});

// Esquema para producto
const productoSchema = z.object({   
    nombre_producto: z.string().min(1),
    descripcion_producto: z.string().min(1),
    precio_producto: z.number().min(0, "El precio debe ser mayor o igual a cero"),
    restaurante_producto: z.number().int().positive("El ID del restaurante asociado al producto debe ser un número positivo")
});

// Esquema para cliente
const clienteSchema = z.object({
    nombre_cliente: z.string().min(1),
    telefono_cliente: z.string().regex(/^\d+$/, "El teléfono debe contener solo números"),
    direccion_cliente: z.string().regex(/^[a-zA-Z0-9\s\#\-\.\,]+$/, "La dirección contiene caracteres inválidos"),
    email_cliente: z.string().email()
});

// Esquema para pedido
const pedidoSchema = z.object({
    cliente_pedido: z.number().int().positive("El ID del cliente debe ser un número positivo"),
    productos_pedido: z.array(z.number().int().positive("El ID de producto debe ser un número positivo")).min(1, "Debe haber al menos un producto en el pedido"),
    total_pedido: z.number().min(0, "El total debe ser mayor o igual a cero"),
    estado_pedido: z.enum(["pendiente", "en_proceso", "entregado"])
});

// Esquema para user
const userShema = z.object({
    nombre_user: z.string(),
    email_user: z.string().email(),
    password_user: z.string(),
    role_user: z.enum(["repartidor", "cliente", "vendedor"])
});

export {
    repartidorSchema,
    restauranteSchema,
    productoSchema,
    clienteSchema,
    pedidoSchema,
    userShema
};
