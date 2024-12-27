const { Detail } = require("../models/details");
const { Category } = require("../models/category");
const { Car } = require("../models/car");
const { HomeSlider } = require("../models/homeslider");
const { HomeBanner } = require("../models/homebanner");
const {Article} = require("../models/articles");

const mongoose = require('mongoose');

const run = async () => {
    const defaultArr = ["Auxiliary heating", "Head-up display", "Alloy wheels", "Bluetooth", "MP3 interface", "Electric side mirror", "Navigation system", "CD player", "Sports package", "Panoramic roof", "Central locking", "Sports suspension", "Parking sensors"];

    const carData = [
        {
            type: "Premium",
            typeDes: "Volkswagen Tiguan or Similar",
            seats: 4,
            bags: 2,
            doors: 4,
            snow: "A/C",
            imgUrl: "https://motors.stylemixthemes.com/rent-a-car/wp-content/uploads/sites/7/2017/01/suv_trucks-1.png",
            layterDayPrice: 900,
            nowDayPrice: 800,
            details: ['Alexiliary heating', 'Head-up Display', 'Alloy wheels', 'Bluetooth', 'MP3 interface', 'Electric side Mirrow', 'CD player', 'Navigation System', 'Sports Package', 'Panoramic roof', 'Central Locking'],
        },
        {
            type: "Economy",
            typeDes: "Mini Cooper 3 or Similar",
            seats: 4,
            doors: 2,
            snow: "A/C",
            imgUrl: "https://motors.stylemixthemes.com/rent-a-car/wp-content/uploads/sites/7/2017/01/economy.png",
            layterDayPrice: 150,
            nowDayPrice: 100,
            details: ['Alloy wheels', 'Bluetooth', 'MP3 interface', 'Electric side Mirrow', 'CD player', 'Navigation System', 'Sports Package', 'Panoramic roof', 'Central Locking'],
        },
        {
            type: "Standart",
            typeDes: "Volkswagen Tiguan or Similar",
            seats: 4,
            bags: 2,
            doors: 4,
            snow: "A/C",
            imgUrl: "https://motors.stylemixthemes.com/rent-a-car/wp-content/uploads/sites/7/2017/01/stand-1.png",
            layterDayPrice: 340,
            nowDayPrice: 280,
            details: ['Alexiliary heating', 'Head-up Display', 'Alloy wheels', 'Bluetooth', 'MP3 interface', 'Electric side Mirrow','Sports Package', 'Panoramic roof', 'Central Locking'],
        },
        {
            type: "Specially",
            typeDes: "Volkswagen Tiguan or Similar",
            seats: 4,
            bags: 2,
            doors: 4,
            snow: "A/C",
            imgUrl: "https://motors.stylemixthemes.com/rent-a-car/wp-content/uploads/sites/7/2017/01/speciality.png",
            layterDayPrice: 600,
            nowDayPrice: 589,
            details: ['Alexiliary heating', 'Head-up Display', 'Alloy wheels', 'Bluetooth', 'Electric side Mirrow', 'CD player', 'Panoramic roof', 'Central Locking'],
        },
        {
            type: "Minivan",
            typeDes: "Volkswagen Tiguan or Similar",
            seats: 4,
            bags: 2,
            doors: 4,
            snow: "A/C",
            imgUrl: "https://motors.stylemixthemes.com/rent-a-car/wp-content/uploads/sites/7/2017/01/minivan_van.png",
            layterDayPrice: 1240,
            nowDayPrice: 1180,
            details: ['Alexiliary heating', 'Head-up Display', 'Alloy wheels', 'Mp3 interface', 'Bluetooth', 'Electric side Mirrow', 'CD player', 'Navigation System', 'Sports Package', 'Panoramic roof', 'Central Locking'],
        },
        {
            type: "Convertible",
            typeDes: "Volkswagen Tiguan or Similar",
            seats: 4,
            bags: 2,
            doors: 4,
            snow: "A/C",
            imgUrl: "https://motors.stylemixthemes.com/rent-a-car/wp-content/uploads/sites/7/2017/01/conv-1.png",
            layterDayPrice: 1001,
            nowDayPrice: 900,
            details: ['Alexiliary heating','MP3 interface', 'Electric side Mirrow', 'Navigation System', 'Sports Package', 'Panoramic roof', 'Central Locking'],
        },
      ];

      const homesliderData = [
        {
            url: "https://imgcdn.oto.com/marketing/mg-4-ev-desktop-min-1729491943.jpg"
        },
        {
            url: "https://imgcdn.oto.com/marketing/chery-omoda-5-desktop-min-1729491988.jpg"
        },
        {
            url: "https://imgcdn.oto.com/marketing/car-insurance-oto-desktop-en-1717769360.jpg"
        },
        {
            url: "https://imgcdn.oto.com/marketing/wuling-air-ev-desktop-min-1729491857.jpg"
        },
      ];

      const homebannerData = [
        {
            url: "https://imgcdn.oto.com/category/1641466199.png",
            title: "Dealer Motor",
            des: "Dealer Top Terdekat"
        },
        {
            url: "https://imgcdn.oto.com/category/1641466837.png",
            title: "Dealer Truck",
            des: "Dealer Top Terdekat"
        },
        {
            url: "https://imgcdn.oto.com/category/1641465159.png",
            title: "Promo Mobi",
            des: "Temukan Penawaran Menarlk"
        },
        {
            url: "https://imgcdn.oto.com/category/service-center-mobil-1641465544.png",
            title: "Service Center Mobil",
            des: "Anhil Penarwatan Mobil"
        },
        {
            url: "https://imgcdn.oto.com/category/1641466355.png",
            title: "Service Center Motor",
            des: "Perawatan Ahil Motor"
        },
        {
            url: "https://imgcdn.oto.com/category/1641465944.png",
            title: "Jual Mobil Bekas",
            des: "Denagan Harga Terbalk"
        },
        {
            url: "https://imgcdn.oto.com/category/1641466837.png",
            title: "Dealer Truck",
            des: "Dealer Top Terdekat"
        },
        {
            url: "https://imgcdn.oto.com/category/1641465159.png",
            title: "Promo Mobi",
            des: "Temukan Penawaran Menarlk"
        },
        {
            url: "https://imgcdn.oto.com/category/service-center-mobil-1641465544.png",
            title: "Service Center Mobil",
            des: "Anhil Penarwatan Mobil"
        },
        {
            url: "https://imgcdn.oto.com/category/1641466355.png",
            title: "Service Center Motor",
            des: "Perawatan Ahil Motor"
        },
        {
            url: "https://imgcdn.oto.com/category/1641465944.png",
            title: "Jual Mobil Bekas",
            des: "Denagan Harga Terbalk"
        },
      ]

      const articles = [
        {
            url: "https://ayobangun.com/wp-content/uploads/2023/10/fasad-dinding-300x225.png",
            title: "Fasad Rumah Laser Cutting",
            des: "Fasad Rumah Laser Cutting – Fasad adalah bagian terluar dari suatu bangunan atau struktur, yang terletak di bagian depan atau bagian eksterior bangunan tersebut. Fasad adalah"
        },
        {
            url: "https://ayobangun.com/wp-content/uploads/2022/08/pagar-1-300x204.png",
            title: "Jenis Pagar Keliling Rumah Berdasarkan Materialnya",
            des: "Jenis Pagar Keliling Rumah – Pagar adalah bangunan yang paling mudah terlihat dari suatu rumah, sehingga tampilannya wajib serasi dengan bidang luar rumah. Tidak cuma"
        },
        {
            url: "https://ayobangun.com/wp-content/uploads/2022/09/jasa-bangun-rumah-murah-bogor-300x200.jpg",
            title: "Jasa Bangun Rumah Murah Bogor dan Renovasi",
            des: "Jasa bangun rumah murah bogor dan renovasi – Memiliki rumah yang indah dan nyaman adalah impian semua orang. Apakah anda sedang memiliki rencana untuk membangun"
        },
        {
            url: "https://ayobangun.com/wp-content/uploads/2024/05/mondrian-300x165.png",
            title: "Mengulas Kasus Shila Sawangan Bermasalah",
            des: "Shila Sawangan, sebuah proyek perumahan yang terletak di kawasan strategis Sawangan, Depok, telah menarik perhatian banyak calon pembeli dengan janji kehidupan mewah dan fasilitas lengkap."
        },
        {
            url: "https://ayobangun.com/wp-content/uploads/2024/05/in-kracht-van-gewijsde-300x200.jpg",
            title: "Tips Menghadapi Kasus Hukum Sengketa Tanah",
            des: "Sengketa tanah adalah masalah serius yang dapat menimbulkan stres dan ketidakpastian bagi semua pihak yang terlibat. Tidak hanya mempengaruhi aspek finansial, tetapi juga dapat berdampak"
        },
        {
            url: "https://ayobangun.com/wp-content/uploads/2022/09/cara-merawat-gorden-293x300.png",
            title: "Gorden Minimalis",
            des: "Gorden minimalis adalah jenis gorden yang dirancang dengan konsep sederhana namun elegan, yang sesuai dengan gaya interior modern dan minimalis. Gorden ini sering digunakan untuk"
        },
        {
            url: "https://ayobangun.com/wp-content/uploads/2024/06/Jasa-Sedot-WC-Semarang-300x181.webp",
            title: "Mengenal Lebih Dekat Perusahaan Jasa Sedot WC",
            des: "Perusahaan jasa sedot WC memainkan peran vital dalam menjaga kebersihan dan kesehatan lingkungan. Dengan keahlian dalam menangani limbah domestik, perusahaan ini memastikan sistem sanitasi berfungsi"
        },
        {
            url: "https://ayobangun.com/wp-content/uploads/2023/12/kusen-pintu-aluminium.jpg",
            title: "Tips Memasang Kusen Pintu Aluminium",
            des: "Pemasangan kusen pintu aluminium melibatkan beberapa tahapan yang perlu diikuti dengan hati-hati untuk memastikan hasil akhir yang baik. Berikut adalah langkah-langkah umum yang terlibat dalam"
        },
        {
            url: "https://ayobangun.com/wp-content/uploads/2023/11/Model-Geser-Sliding-300x300.png",
            title: "Kusen Aluminium Untuk Pintu dan Jendela Rumah",
            des: "Kusen aluminium untuk pintu dan jendela rumah merujuk pada bingkai atau frame yang terbuat dari aluminium dan digunakan sebagai rangka untuk memasang pintu dan jendela."
        }
      ]

    try {

        // detail seed Data
        // const detail = new Detail({ details: defaultArr });
        // await detail.save();
        console.log("Details mock data succesffuly saved");

        // category seed Data
        // carData.map(async (data, key) => {
        //     let newCat = new Category({
        //         type: data.type,
        //         typeDes: data.typeDes,
        //         seats: data.seats,
        //         doors: data.doors,
        //         bags: data.bags,
        //         snow: data.snow,
        //         nowDayPrice: data.nowDayPrice,
        //         imgUrl: data.imgUrl,
        //         details: data.details
        //     });
        //     await newCat.save();
        // })
        
        console.log("category mock data saved successfully")

        // car - brand seed Data

        // let i , j = 0;
        // let categories = await Category.find();
        // for (j = 0; j < categories.length ; j ++) {
        //     for (i = 0; i < carData.length ; i++) {
        //         let newCar = new Car({
        //             type: categories[j].type + "---" + i,
        //             typeDes: carData[i].typeDes,
        //             seats: carData[i].seats,
        //             doors: carData[i].doors,
        //             bags: carData[i].bags,
        //             snow: carData[i].snow,
        //             nowDayPrice: carData[i].nowDayPrice,
        //             laterDayPrice: carData[i].layterDayPrice,
        //             imgUrl: carData[i].imgUrl,
        //             details: carData[i].details,
        //             catId: categories[j]._id
        //         });
        //         await newCar.save();
        //     }
        // }

        console.log("car - brand mock saved successfully");


        // HomeSlider - Seed Data
        // homesliderData.map(async (data, key) => {
        //     let newHomeSlider = new HomeSlider({
        //         url: data.url,
        //     });
        //     await newHomeSlider.save();
        // })

        console.log("homeslider images created succesffuly");


        // Home Banner - Seed Data
        // homebannerData.map(async (data, key) => {
        //     let newHomeBanner = new HomeBanner({
        //         url: data.url,
        //         title: data.title,
        //         des: data.des
        //     });
        //     await newHomeBanner.save();
        // })

        console.log("Home Banner saved succesfully");

        // Article - Seed Data
        articles.map(async (data, key) => {
            let newArticle = new Article({
                url: data.url,
                title: data.title,
                des: data.des
            });
            await newArticle.save();
        })


    }
    catch (err) {
        console.error("error saving", err)
    }
}

// Make sure to connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cartopia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    run(); // Run your seed function here
})
.catch(err => {
    console.error('Could not connect to MongoDB:', err);
});