const mapping = [  
    {
        nombre_repartidor: "nombre",
        telefono_repartidor: "telefono",
        vehiculo_repartidor: "vehiculo",
        disponible_repartidor: "disponible",
        coordinates_repartidor: "coordinates"
    },
    {
        nombre_restaurante: "nombre",
        direccion_restaurante: "direccion",
        categoria_restaurante: "categoria",
        coordinates_restaurante: "coordinates"
    },
    {
        nombre_producto: "nombre",
        descripcion_producto: "descripcion",
        precio_producto: "precio",
        restaurante_producto: "restaurante"
    },
    {
        nombre_cliente: "nombre",
        telefono_cliente: "telefono",
        direccion_cliente: "direccion",
        email_cliente: "email"
    },
    {
        cliente_pedido: "IdCliente",
        productos_pedido: "productos",
        total_pedido: "total",
        estado_pedido: "estado"
    }
];

const funMapping = (validatedData, mappingNum) => {
    // Realiza la transformación de nombres de campo
    const transformedData = {};
    for (const original in mapping[mappingNum]) {
        const copy = mapping[mappingNum][original];
        transformedData[copy] = validatedData[original];
    }
    return transformedData;
}

export default funMapping;
