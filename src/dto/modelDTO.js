import { z } from "zod";



// Esquema para restaurante
const restauranteSchema = z.object({
    nombre_restaurante: z.string().min(1),
    direccion_restaurante: z.string().regex(/^[a-zA-Z0-9\s\#\-\.\,]+$/, "La dirección contiene caracteres inválidos"),
    categoria_restaurante: z.string().min(1),
    coordinates_restaurante: z.array(z.number()).length(2),
});

// Esquema para producto
const productoSchema = z.object({
    nombre_producto: z.string().min(1),
    descripcion_producto: z.string().min(1),
    precio_producto: z.number().min(0, "El precio debe ser mayor o igual a cero"),
    restaurante_producto: z.number().int().positive("El ID del restaurante asociado al producto debe ser un número positivo"),
    stock_producto: z.number().min(1, "El stock debe ser mayor a 0")
});

// Esquema para pedido 
const pedidoSchema = z.object({
    productos_pedido: z.array(z.number().int().positive("El ID de producto debe ser un número positivo")).min(1, "Debe haber al menos un producto en el pedido"),
    total_pedido: z.number().min(0, "El total debe ser mayor o igual a cero"),
    estado_pedido: z.enum(["pendiente", "en_proceso", "entregado"]),
    id_restaurante_pedido: z.number().min(0, "id pedido deber mayor o igual a cero")
});

// Esquema para user
const userShema = z.object({
    nombre_user: z.string(),
    email_user: z.string().email(),
    password_user: z.string(),
    role_user: z.enum(["repartidor", "cliente", "vendedor", "user"]),
    coordinates_user: z.array(z.number()).length(2),
    permisos_user: z.array(z.string()).min(1, "Los permisos deben ser igual o mayor a uno"),
    telefono_user: z.string().regex(/^\d+$/, "El teléfono debe contener solo números")
});


export {
    restauranteSchema,
    productoSchema,
    pedidoSchema,
    userShema
};
