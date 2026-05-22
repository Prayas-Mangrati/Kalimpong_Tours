require("dotenv").config();

const Place = require("./models/place");
const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error("MONGO_URL is not defined");
}

const places = [
  {
    title: "Delo Hills",
    type: "tourist",
    location: "Kalimpong",
    description:
      "A scenic hilltop offering panoramic views of the Kanchenjunga range and Teesta valley.",
    full_description:
      "Delo Hills in Kalimpong is one of the most popular tourist spots, known for its breathtaking panoramic views of the Kanchenjunga range, Teesta River, and the surrounding green valleys. It offers a perfect mix of natural beauty and fun activities. Visitors can enjoy thrilling experiences like paragliding, horse riding, and various outdoor games available in the park area. The place is well-developed with maintained gardens, viewpoints, and picnic spots, making it ideal for families and friends. There are small food stalls and cafes where you can try local snacks while enjoying the scenery. Delo is also famous for its peaceful environment, sunrise and sunset views, and camping experiences, where tourists can stay overnight in tents and enjoy bonfires under the open sky. Overall, it is a complete destination combining adventure, relaxation, and scenic beauty.",
    img: "https://i.ytimg.com/vi/PzudPTzZZUU/maxresdefault.jpg",
    price: "₹50/Person",
    latitude: 27.0367,
    longitude: 88.4753,
  },
  {
    title: "Durpin Monastery",
    type: "tourist",
    location: "Kalimpong",
    description:
      "A peaceful monastery located on Durpin Hill with stunning views and spiritual ambiance.",
    full_description:
      "Durpin Monastery, also known as Zang Dhok Palri Phodang, is a serene and spiritually significant Buddhist monastery located on Durpin Hill in Kalimpong. Surrounded by beautiful natural scenery, the area offers stunning panoramic views of the Teesta River, lush valleys, and distant Himalayan ranges. The monastery itself is peaceful and rich in culture, housing rare Tibetan scriptures and vibrant wall paintings. Nearby, visitors can also see Indian Army camps, which add a sense of security and discipline to the area. The region around Durpin Hill includes open grounds and even a helipad (helicopter landing ground), often used for official purposes. Close to this area, there are also golf grounds and wide open spaces that enhance the scenic charm. Overall, Durpin Monastery is a perfect blend of spirituality, scenic beauty, and a unique glimpse of structured hilltop life.",
    img: "https://www.trawell.in/admin/images/upload/137673942Kalimpong_Zong_Dhog_Palri_Fo_Brang_Monastery_Main.jpg",
    price: "Free",
    latitude: 27.0536,
    longitude: 88.4871,
  },
  {
    title: "Cactus Nursery",
    type: "tourist",
    location: "Kalimpong",
    description:
      "A unique garden featuring a wide variety of rare and exotic cactus plants.",
    full_description:
      "The Cactus Nursery in Kalimpong is a unique and fascinating destination known for its vast collection of rare and exotic cactus and succulent plants. It is one of the largest nurseries of its kind in Asia, attracting plant lovers, photographers, and tourists from all over. The nursery showcases a wide variety of shapes, sizes, and species, many of which are not commonly seen elsewhere. Visitors can walk through beautifully arranged sections, learn about different plant types, and enjoy the peaceful green surroundings. The place is perfect for nature enthusiasts and those looking for a calm, educational experience. Small plant sales are also available, allowing visitors to take home a piece of this unique collection.",
    img: "https://traveldefiner.wordpress.com/wp-content/uploads/2019/05/cactus-nursery.jpg?w=750",
    price: "₹50/Person",
    latitude: 27.0632,
    longitude: 88.4655,
  },
  {
    title: "Kalimpong Science Centre",
    type: "tourist",
    location: "Kalimpong",
    description:
      "An interactive science museum perfect for learning and fun experiences.",
    full_description:
      "Kalimpong Science Centre is an interactive and educational attraction perfect for students, families, and kids. It offers a fun learning experience through various science-related gadgets, models, and hands-on exhibits that explain scientific concepts in an engaging way. One of the main highlights is the 3D movie show, which provides an immersive visual experience. The centre also features virtual reality (VR) experiences, a mirror room that plays with optical illusions, and a variety of indoor and outdoor games for children. Outside, there is a dinosaur park/garden with life-sized models that adds excitement, especially for younger visitors. Surrounded by scenic views, the science centre combines education, entertainment, and nature, making it a must-visit spot in Kalimpong.",
    img: "https://1001things.org/wp-content/uploads/2015/10/Science-Center-Kalimpong-Image.jpg",
    price: "₹50/Person",
    latitude: 27.0605,
    longitude: 88.4729,
  },
  {
    title: "Morgan House",
    type: "tourist",
    location: "Kalimpong",
    description:
      "A colonial-era mansion surrounded by lush greenery and historical charm.",
    full_description:
      "Morgan House, located on Durpin Road in Kalimpong, is a charming colonial-era bungalow known for its old-world architecture, peaceful surroundings, and intriguing history. Built during the British period, it once served as the residence of a British officer’s family and still retains its vintage charm with wooden interiors, fireplaces, and spacious lawns. Surrounded by pine trees and scenic hills, the place offers a calm and slightly mysterious atmosphere. Over the years, Morgan House has gained popularity not just as a tourist lodge but also for its subtle haunted reputation, with locals sharing stories about unexplained sounds and sightings, adding a sense of thrill for visitors. Today, it is maintained as a heritage tourist stay where people can experience both the beauty of Kalimpong and a glimpse into its colonial past, making it a must-visit for history lovers and adventure seekers alike.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Morgan_House_Kalimpong_3.jpg/1280px-Morgan_House_Kalimpong_3.jpg",
    price: "₹50/Person",
    latitude: 27.0579,
    longitude: 88.488,
  },

  {
    title: "The Elgin Silver Oaks",
    type: "hotel",
    location: "Kalimpong",
    description:
      "A luxury heritage hotel offering elegant rooms and breathtaking mountain views.",
    full_description:
      "The Elgin Silver Oaks in Kalimpong is a luxurious heritage hotel that beautifully reflects colonial-era elegance combined with modern comfort. Originally built as a British summer residence, the property features classic architecture, wooden interiors, antique furnishings, and spacious rooms that give a royal and vintage feel. Surrounded by lush greenery, manicured gardens, and scenic Himalayan views, it offers a peaceful and relaxing atmosphere for visitors. Guests can enjoy fine dining, cozy fireplaces, and serene outdoor spaces perfect for leisure walks and photography. Known for its warm hospitality and charming ambiance, The Elgin Silver Oaks is not just a stay but an experience that lets visitors relive the grace and lifestyle of the British era in the hills of Kalimpong.",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/9a/71/76/the-elgin-silver-oaks.jpg?w=900&h=500&s=1",
    price: "₹6000/night",
    latitude: 27.0663,
    longitude: 88.4668,
  },
  {
    title: "May Fair Himalayan Spa Resort",
    type: "hotel",
    location: "Kalimpong",
    description:
      "A premier luxury hill retreat, where Himalayan vistas meet contemporary comfort",
    full_description:
      "Mayfair Himalayan Spa Resort in Kalimpong is a premium luxury retreat that offers a perfect blend of comfort, nature, and wellness. Surrounded by lush green forests and overlooking the scenic Himalayan hills, the resort provides a peaceful escape from the busy city life. It is well known for its world-class spa facilities, where visitors can relax with rejuvenating therapies and wellness treatments. The property features beautifully designed rooms, landscaped gardens, and modern amenities along with indoor and outdoor games for recreation. Guests can also enjoy delicious multi-cuisine dining, bonfire evenings, and leisure walks within the serene surroundings. With its calm ambiance, luxury experience, and stunning views, Mayfair Himalayan Spa Resort is an ideal destination for relaxation, family stays, and romantic getaways.",
    img: "https://media-cdn.tripadvisor.com/media/photo-s/11/aa/03/88/himalayan-hotel.jpg",
    price: "₹7000/night",
    latitude: 27.0524,
    longitude: 88.4597,
  },
  {
    title: "Summit Barsana Resort",
    type: "hotel",
    location: "Kalimpong",
    description:
      "A comfortable resort with modern amenities and scenic surroundings.",
    full_description:
      "Summit Barsana Resort & Spa in Kalimpong is a well-known hillside retreat offering stunning views of the surrounding mountains and valleys. The resort combines modern comfort with a cozy mountain ambiance, making it ideal for both relaxation and leisure stays. It features comfortable rooms with balconies, a multi-cuisine restaurant, and a spa facility where guests can unwind and rejuvenate. Visitors can enjoy indoor games, outdoor seating areas, and peaceful walks while taking in the fresh hill air. The property is especially popular for its sunrise and sunset views, warm hospitality, and serene environment. Whether for a family trip, couple getaway, or a quiet vacation, Summit Barsana Resort provides a comfortable and scenic stay experience in Kalimpong.",
    img: "https://pix10.agoda.net/hotelImages/446087/-1/0bc760d38a0618cccebb4105ed3df800.jpg?ce=0&s=414x232",
    price: "₹3500/night",
    latitude: 27.0612,
    longitude: 88.4635,
  },
  {
    title: "Hotel Garden Reach",
    type: "hotel",
    location: "Kalimpong",
    description:
      "A budget-friendly hotel with cozy rooms and great hospitality.",
    full_description:
      "Hotel Garden Reach in Kalimpong is a charming hillside property known for its peaceful ambiance and beautiful garden surroundings. The hotel offers comfortable and well-furnished rooms, many with balconies that provide scenic views of the mountains and valleys. As the name suggests, one of its main highlights is the lush garden area, perfect for relaxation, morning walks, and enjoying the fresh hill air. Guests can enjoy homely hospitality along with multi-cuisine dining options. Its calm environment makes it ideal for families, couples, and travelers looking for a quiet stay away from the crowd while still being close to the main town attractions. Overall, Hotel Garden Reach provides a cozy and refreshing stay experience in Kalimpong.",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/0c/86/fd/garden-reach-hotel.jpg?w=500&h=400&s=1",
    price: "₹2500/night",
    latitude: 27.0678,
    longitude: 88.4662,
  },

  {
    title: "Pine View Homestay",
    type: "homestay",
    location: "Kalimpong",
    description:
      "A peaceful homestay offering warm hospitality and beautiful forest views.",
    full_description:
      "Pine View Homestay in Kalimpong offers a cozy and homely stay experience surrounded by tall pine trees and peaceful natural surroundings. It is perfect for travelers looking to experience local culture and warm hospitality away from busy tourist spots. The homestay provides comfortable rooms, simple yet delicious home-cooked food, and beautiful views of the hills and valleys. Guests can enjoy quiet mornings, nature walks, and relaxing evenings in a calm environment. The friendly hosts often share local insights, making the stay more personal and memorable. Pine View Homestay is ideal for solo travelers, couples, and families seeking a budget-friendly and authentic hill-stay experience.",
    img: "https://content3.jdmagicbox.com/comp/darjeeling/v6/9999px354.x354.230428031257.h9v6/catalogue/pine-view-homestay-jhandi-lava-darjeeling-home-stay-8sfe69kh68.jpg",
    price: "₹1800/night",
    latitude: 27.0805,
    longitude: 88.5002,
  },
  {
    title: "Hilltop Homestay",
    type: "homestay",
    location: "Kalimpong",
    description: "A cozy stay with local food and stunning sunrise views.",
    full_description:
      "Hilltop Homestay in Kalimpong offers a peaceful and scenic stay experience located at an elevated point, providing beautiful panoramic views of the surrounding hills and valleys. It is an ideal choice for travelers looking to relax in a quiet and natural environment away from the crowded town areas. The homestay features comfortable rooms, warm local hospitality, and delicious home-cooked meals that give guests a taste of the local culture. Visitors can enjoy stunning sunrise and sunset views, fresh mountain air, and nature walks around the area. With its cozy atmosphere and welcoming hosts, Hilltop Homestay is perfect for couples, families, and solo travelers seeking a simple yet memorable stay in Kalimpong.",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/9d/b1/f2/img20181014152738-largejpg.jpg?w=900&h=500&s=1",
    price: "₹1500/night",
    latitude: 27.0701,
    longitude: 88.4806,
  },
  {
    title: "Orchid Homestay",
    type: "homestay",
    location: "Kalimpong",
    description:
      "A charming homestay surrounded by greenery and peaceful vibes.",
    full_description:
      "Orchid Homestay in Kalimpong is a cozy and welcoming stay option that offers a peaceful environment surrounded by natural beauty. Known for its warm hospitality and homely atmosphere, it provides comfortable rooms with scenic views of the hills and greenery. The homestay often features small garden areas with beautiful flowers, adding to its charm and relaxing vibe. Guests can enjoy freshly prepared home-cooked meals and experience local culture through friendly interactions with the hosts. It is an ideal place for travelers seeking a quiet, budget-friendly, and authentic stay away from the busy tourist areas while still enjoying the beauty of Kalimpong.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ho0qsLWgeTj9mPruGVLTuxP8olVjvF5LYw&s",
    price: "₹2000/night",
    latitude: 27.0588,
    longitude: 88.4699,
  },
];

async function initDb() {
  try {
    async function main() {
      await mongoose.connect(mongoUrl);
    }
    await main()
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Error connecting to MongoDB:", err));

    await Place.deleteMany({});
    console.log("Old data cleared");

    await Place.insertMany(places);
    console.log("Database Initialized");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}
initDb();
