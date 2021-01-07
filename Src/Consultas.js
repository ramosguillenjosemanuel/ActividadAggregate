/*Consultas personalizadas*/

/*Importe total de la venta = numero de unidades * precio unitario */
db.ventas.aggregate([
{ $project: { item: true, importeventas:{$add:
    [ {$multiply :["$preciounitario","$numerounidades"]}]}}}]) 
   
    /* { "_id" : ObjectId("5ff63a527ada759c32ddcab3"), "item" : "playstation 5", "importeventas" : 112000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab4"), "item" : "xbox series", "importeventas" : 85500 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab5"), "item" : "nintendo switch", "importeventas" : 80000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab6"), "item" : "nintendo ds", "importeventas" : 16500 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab7"), "item" : "ps4", "importeventas" : 25000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab8"), "item" : "xbox 360", "importeventas" : 30600 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab9"), "item" : "auriculares logitech320", "importeventas" : 4500 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcaba"), "item" : "xbox one", "importeventas" : 60000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcabb"), "item" : "gameboy", "importeventas" : 21600 } */




/*Beneficios obtenidos= importe total - (número de unidades * coste de fabricación) */

db.ventas.aggregate([
    
    { $project:
         { item: true,
             beneficios:
             {$subtract:
            [ {$multiply :["$preciounitario","$numerounidades"]},
                    {$multiply :["$numerounidades","$costefabricacion"]}
                ]
            }
        }
    }
]
)

            /* { "_id" : ObjectId("5ff63a527ada759c32ddcab3"), "item" : "playstation 5", "beneficios" : 74000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab4"), "item" : "xbox series", "beneficios" : 51000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab5"), "item" : "nintendo switch", "beneficios" : 54400 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab6"), "item" : "nintendo ds", "beneficios" : 9900 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab7"), "item" : "ps4", "beneficios" : 15000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab8"), "item" : "xbox 360", "beneficios" : 17000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcab9"), "item" : "auriculares logitech320", "beneficios" : 3000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcaba"), "item" : "xbox one", "beneficios" : 38000 }
{ "_id" : ObjectId("5ff63a527ada759c32ddcabb"), "item" : "gameboy", "beneficios" : 9000 } */

/*Mejores clientes , ordenaremos este campo según la cantidad de beneficios obtenidos  */

db.ventas.aggregate([
    { $group:
         {_id: "$cliente",
                 beneficio:
                 {$sum:
                    {$subtract:
                        [ {$multiply :["$preciounitario","$numerounidades"]},
                                {$multiply :["$numerounidades","$costefabricacion"]}
                            ]
                        }
                    }
        }
    },
                                        {$sort:{beneficio:-1}}
             ])
             /* { "_id" : "carrefour", "beneficio" : 105400 }
{ "_id" : "game", "beneficio" : 74000 }
{ "_id" : "media markt", "beneficio" : 41000 }
{ "_id" : "13juegos", "beneficio" : 41000 }
{ "_id" : "game stop", "beneficio" : 9900 } */
/*Mejores vendedores, ordenaremos este campo según el numero de beneficios obtenidos */
db.ventas.aggregate([
    { $group:
        {_id:"$vendedor",
        beneficio:
        {$sum:
            {$subtract:
                [ {$multiply :["$preciounitario","$numerounidades"]},
                        {$multiply :["$numerounidades","$costefabricacion"]}
                    ]
                }
            }
}
},
                                {$sort:{beneficio:-1}}
     ])
     /* { "_id" : "microsoft", "beneficio" : 106000 }
{ "_id" : "sony", "beneficio" : 89000 }
{ "_id" : "nintendo", "beneficio" : 73300 }
{ "_id" : "logitech", "beneficio" : 3000 } */


/*Mejores artículos, Ordenare los artículos según los beneficios que hayan sacado cada unas de las consolas*/
 db.ventas.aggregate([
 { $group:
        {_id:"$item",
            beneficio:
            {$sum:
                {$subtract:
                    [ {$multiply :["$preciounitario","$numerounidades"]},
                            {$multiply :["$numerounidades","$costefabricacion"]}
                        ]
                    }
                }
    }
    },
                                    {$sort:{beneficio:-1}}
         ])

         /* { "_id" : "playstation 5", "beneficio" : 74000 }
{ "_id" : "nintendo switch", "beneficio" : 54400 }
{ "_id" : "xbox series", "beneficio" : 51000 }
{ "_id" : "xbox one", "beneficio" : 38000 }
{ "_id" : "xbox 360", "beneficio" : 17000 }
{ "_id" : "ps4", "beneficio" : 15000 }
{ "_id" : "nintendo ds", "beneficio" : 9900 }
{ "_id" : "gameboy", "beneficio" : 9000 }
{ "_id" : "auriculares logitech320", "beneficio" : 3000 } */


/*Mejores meses especificamos los meses donde se han realizado más beneficios */

db.ventas.aggregate([
    { $group:
        {_id: {$month:("$fechaventa")}, 
                beneficio:
                {$sum:
                    {$subtract:
                        [ {$multiply :["$preciounitario","$numerounidades"]},
                                {$multiply :["$numerounidades","$costefabricacion"]}
                            ]
                        }
                    }
        }
        },
                {$sort:{beneficio:-1}}
             ])
 /*{ "_id" : 2, "beneficio" : 83900 }
{ "_id" : 7, "beneficio" : 54400 }
{ "_id" : 6, "beneficio" : 51000 }
{ "_id" : 12, "beneficio" : 47000 }
{ "_id" : 5, "beneficio" : 18000 }
{ "_id" : 3, "beneficio" : 17000 }*/


/*Realizare un agrupación de los clientes que compren las consolas que son más caras de fabricar 
(sumando los distintos costes de fabricación de cada consola) */
        db.ventas.aggregate([
            { $group:
                {_id:"$cliente",
                    coste:
                    
                    
                         
                            {$sum:"$costefabricacion"}
                        
                }
                },
                {$sort:{costefabricacion:-1} }
            ]
            
        )
        /*{ "_id" : "game", "coste" : 380 }
{ "_id" : "game stop", "coste" : 60 }
{ "_id" : "carrefour", "coste" : 620 }
{ "_id" : "media markt", "coste" : 500 }
{ "_id" : "13juegos", "coste" : 250 } */


/*Realizare una búsqueda de las consolas que hayan sido vendidas por la empresa Microsoft 
o que tengan un numero de unidades mayor que 160  */
db.ventas.aggregate([
    { $match: { $or: [ { numerounidades: { $gte: 160 },vendedor : "microsoft" }]}}  
        
    ]);
    /* { "_id" : ObjectId("5ff652497ada759c32ddcad3"), "item" : "xbox 360", "preciounitario" : 180, "costefabricacion" : 80,
     "numerounidades" : 170, "preciopormayor" : 150,
      "fechaventa" : ISODate("2020-03-12T00:00:00Z"), 
      "cliente" : "media markt", "vendedor" : "microsoft" }
{ "_id" : ObjectId("5ff652497ada759c32ddcad5"), "item" : "xbox one",
 "preciounitario" : 300, "costefabricacion" : 110,
  "numerounidades" : 200, "preciopormayor" : 250,
   "fechaventa" : ISODate("2020-12-29T00:00:00Z"), 
   "cliente" : "13juegos", "vendedor" : "microsoft" } */


/* He realizado la media de las unidades de las  consolas de nintendo */
db.ventas.aggregate(
    [
        {
        $match: {vendedor:"nintendo"}
        },
        {
           $group:{
            _id: "$vendedor",
            mediaunidades:
            
             { $avg: { $sum: [ "$numerounidades" ] } } 
            
           } 
        }
    ]
)
/* { "_id" : "nintendo", "mediaunidades" : 240 } */

/*He realizado una división entre el precio unitario y el coste de fabricación para calcular el margen de beneficios */
db.ventas.aggregate(
    [
        {
             $project: { item: true, margenbeneficios: { $divide: [ "$preciounitario", "$costefabricacion" ] } } }
        
        ])
        /*{ "_id" : ObjectId("5ff652497ada759c32ddcace"), "item" : "playstation 5", "margenbeneficios" : 2.9473684210526314 }
{ "_id" : ObjectId("5ff652497ada759c32ddcacf"), "item" : "xbox series", "margenbeneficios" : 2.4782608695652173 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad0"), "item" : "nintendo switch", "margenbeneficios" : 3.125 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad1"), "item" : "nintendo ds", "margenbeneficios" : 2.5 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad2"), "item" : "ps4", "margenbeneficios" : 2.5 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad3"), "item" : "xbox 360", "margenbeneficios" : 2.25 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad4"), "item" : "auriculares logitech320", "margenbeneficios" : 3 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad5"), "item" : "xbox one", "margenbeneficios" : 2.727272727272727 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad6"), "item" : "gameboy", "margenbeneficios" : 1.7142857142857142 } */

/* He buscado el valor más grande de la multiplicación entre el coste de fabricación y el numero de unidades */
db.ventas.aggregate(
    [
        {
            $group:{
                _id: "$item",
                maxunidad:
                {
                $max:{ $multiply: [ "$costefabricacion", "$numerounidades" ] } }
                }
            }
            ])
            /*{ "_id" : "nintendo ds", "maxunidad" : 6600 }
{ "_id" : "ps4", "maxunidad" : 10000 }
{ "_id" : "xbox 360", "maxunidad" : 13600 }
{ "_id" : "xbox one", "maxunidad" : 22000 }
{ "_id" : "nintendo switch", "maxunidad" : 25600 }
{ "_id" : "playstation 5", "maxunidad" : 38000 }
{ "_id" : "gameboy", "maxunidad" : 12600 }
{ "_id" : "xbox series", "maxunidad" : 34500 }
{ "_id" : "auriculares logitech320", "maxunidad" : 1500 } */

/*Búsqueda para mostrar en pantalla los días del mes cuando los artículos fueron puestos a la venta */
db.ventas.aggregate([
   { $project: {  item: true,
        Dia: 
        { $dayOfMonth: ("$fechaventa") }}}

   ])
   /*{ "_id" : ObjectId("5ff652497ada759c32ddcace"), "item" : "playstation 5", "Dia" : 16 }
{ "_id" : ObjectId("5ff652497ada759c32ddcacf"), "item" : "xbox series", "Dia" : 27 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad0"), "item" : "nintendo switch", "Dia" : 22 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad1"), "item" : "nintendo ds", "Dia" : 17 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad2"), "item" : "ps4", "Dia" : 11 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad3"), "item" : "xbox 360", "Dia" : 12 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad4"), "item" : "auriculares logitech320", "Dia" : 18 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad5"), "item" : "xbox one", "Dia" : 29 }
{ "_id" : ObjectId("5ff652497ada759c32ddcad6"), "item" : "gameboy", "Dia" : 9 }
{ "_id" : ObjectId("5ff655edf4892341e8bf4557"), "item" : "playstation 5", "Dia" : 16 }
{ "_id" : ObjectId("5ff655edf4892341e8bf4558"), "item" : "xbox series", "Dia" : 27 } */