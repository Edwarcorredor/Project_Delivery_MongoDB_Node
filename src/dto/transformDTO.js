const mapping = {
    repartidor:{
        nombre_repartidor: "nombre",
        telefono_repartidor: "telefono",
        vehiculo_repartidor: "vehiculo",
        disponible_repartidor: "disponible",
        coordinates_repartidor: "coordinates"
    },
    restaurante: {
        nombre_restaurante: "nombre",
        direccion_restaurante: "direccion",
        categoria_restaurante: "categoria",
        coordinates_restaurante: "coordinates"
    },
    producto: {
        nombre_producto: "nombre",
        descripcion_producto: "descripcion",
        precio_producto: "precio",
        restaurante_producto: "restaurante"
    },
    cliente: {
        nombre_cliente: "nombre",
        telefono_cliente: "telefono",
        direccion_cliente: "direccion",
        email_cliente: "email"
    },
    pedido: {
        cliente_pedido: "IdCliente",
        productos_pedido: "productos",
        total_pedido: "total",
        estado_pedido: "estado"
    }

}  
    

const funMapping = (validatedData, collection) => {
    // Realiza la transformación de nombres de campo
    const transformedData = {};
    for (const original in mapping[collection]) {
        const copy = mapping[collection][original];
        transformedData[copy] = validatedData[original];
    }
    return transformedData;
}

export default funMapping;
