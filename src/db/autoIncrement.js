async function getNextSequenceValue(db, sequenceName) {
    const sequenceDocument = await db.collection("counters").findOneAndUpdate(
        { _id: sequenceName }, // Usar un objeto de filtro aquí
        { $inc: { seq: 1 } },
        { returnDocument: "after" } // Usar returnDocument en lugar de new
    );

    console.error(sequenceDocument);
    
    return sequenceDocument.value.seq; // Acceder al valor actualizado
}

export default getNextSequenceValue;
