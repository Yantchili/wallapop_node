const readline = require("readline")
const Product = require("./models/Product")
function askAgain(text) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(text, response => {
            rl.close()
            if (response.toLocaleLowerCase() === "yes") {
                resolve(true)
                return
            }
            else {
                resolve(false)
            }
        })
    })


}
async function main() {
    const confirm = await askAgain("Are you sure you want to reset the data? (yes/no): ")
    if (!confirm) {
        console.log("Operation cancelled")
        process.exit()

    }
    else {
        const connection = require("./lib/connectMongoose")
        await initProducts()
        connection.close()
    }
}

async function initProducts() {
    const result = await Product.deleteMany()
    console.log(`${result.deletedCount} items have been deleted`)
    const initItems = await Product.insertMany(
        [{
            nombre: "Bicicleta",
            venta: true,
            precio: 230.15,
            foto: "https://images.pexels.com/photos/5465176/pexels-photo-5465176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["lifestyle", "motor"]
        },
        {
            nombre: "iPhone",
            venta: false,
            precio: 152.00,
            foto: "https://images.pexels.com/photos/442161/pexels-photo-442161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["lifestyle", "mobile"]
        },
        {
            nombre: "iPad Air (2013) 16 G",
            venta: true,
            precio: 90.00,
            foto: "https://images.pexels.com/photos/1110357/pexels-photo-1110357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["lifestyle", "electronic"]
        },
        {
            nombre: "iPad Air (2019) 256 G",
            venta: true,
            precio: 200.00,
            foto: "https://images.pexels.com/photos/221185/pexels-photo-221185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["lifestyle", "electronic"]
        },
        {
            nombre: "Auriculares Earbud",
            venta: true,
            precio: 37.00,
            foto: "https://i.blogs.es/36ee9f/1366_2000/1366_2000.jpeg",
            tags: ["auriculares", "electronic"]
        },
        {
            nombre: "Auriculares ",
            venta: true,
            precio: 37.00,
            foto: "https://images.pexels.com/photos/7409/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["auriculares", "electronic"]
        },
        {
            nombre: "Moto Honda PCX ",
            venta: true,
            precio: 2370.00,
            foto: "https://images.pexels.com/photos/5235860/pexels-photo-5235860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["auriculares", "electronic"]
        },
        {
            nombre: "Moto nuevo",
            venta: true,
            precio: 499.00,
            foto: "https://images.pexels.com/photos/4992696/pexels-photo-4992696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["auriculares", "electronic"]
        },
        {
            nombre: "libro",
            venta: true,
            precio: 3.00,
            foto: "https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["libro", "education"]
        },
        {
            nombre: "libro de niño",
            venta: true,
            precio: 12.00,
            foto: "https://images.pexels.com/photos/1741231/pexels-photo-1741231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["libro", "education"]
        }, {
            nombre: "Bicicleta Montaña",
            venta: true,
            precio: 889,
            foto: "https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["lifestyle", "motor"]
        },
        {
            nombre: "Bicicleta niño",
            venta: true,
            precio: 70,
            foto: "https://images.pexels.com/photos/680108/pexels-photo-680108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["lifestyle", "motor"]
        },
        {
            nombre: "Bicicleta profesional",
            venta: true,
            precio: 1000,
            foto: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            tags: ["lifestyle", "motor"]
        },
        ]
    )
    console.log(`${initItems.length} items haven added`)
}


main().catch(err => {
    console.log(err)
})