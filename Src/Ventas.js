db.ventas.insertMany([
    { item: "playstation 5",
     preciounitario: 560 ,
     costefabricacion:190,
     numerounidades: 200,
        preciopormayor: 500,
          fechaventa:new Date("2020-02-16")  ,
      cliente:"game",
      vendedor:"sony" 
    },
    { item: "xbox series", preciounitario: 570,costefabricacion:230,numerounidades: 150,preciopormayor: 550, fechaventa:new Date("2020-06-27")  , cliente: "carrefour",vendedor:"microsoft" },
    { item: "nintendo switch", preciounitario: 250,costefabricacion:80,numerounidades: 320,preciopormayor: 200, fechaventa:new Date("2020-07-22")  , cliente: "carrefour",vendedor:"nintendo" },
    { item: "nintendo ds", preciounitario: 75,costefabricacion:30,numerounidades: 220,preciopormayor: 50, fechaventa:new Date("2020-02-17")  , cliente: "game stop",vendedor:"nintendo" },
    { item: "ps4", preciounitario: 250,costefabricacion:100,numerounidades: 100,preciopormayor: 200, fechaventa:new Date("2020-05-11") , cliente: "media markt",vendedor:"sony" },
    { item: "xbox 360", preciounitario: 180,costefabricacion:80,numerounidades: 170,preciopormayor: 150, fechaventa:new Date("2020-03-12")  , cliente: "media markt",vendedor:"microsoft" },
    { item: "auriculares logitech320", preciounitario: 45,costefabricacion:15,numerounidades: 100,preciopormayor: 30, fechaventa:new Date("2020-05-18")  , cliente: "13juegos",vendedor:"logitech" },
    { item: "xbox one", preciounitario:300,costefabricacion:110,numerounidades: 200,preciopormayor: 250, fechaventa:new Date("2020-12-29")  , cliente: "13juegos",vendedor:"microsoft" },
    { item: "gameboy", preciounitario: 120,costefabricacion:70,numerounidades: 180,preciopormayor: 100, fechaventa:new Date("2020-12-09")  , cliente: "media markt",vendedor:"nintendo" }
    ]);





