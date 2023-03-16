const cleanner = (arr) =>
  arr.map((dog) => {
    let hAvg =
      dog.height.metric.split(" - ").length === 2
        ? (parseInt(dog.height.metric.split(" - ")[0]) +
            parseInt(dog.height.metric.split(" - ")[1])) /
          2
        : parseInt(dog.weight.metric);

    let wAvg =
      dog.weight.metric.split(" - ").length === 2
        ? (parseInt(dog.weight.metric.split(" - ")[0]) +
            parseInt(dog.weight.metric.split(" - ")[1])) /
          2
        : parseInt(dog.weight.metric);

    return {
      id: dog.id,
      name: dog.name,
      height: Math.round(hAvg),
      weight: Math.round(wAvg),
      life_span: dog.life_span,
      temperament: dog.temperament,
      image: dog.image.url,
      createdByuser: false,
    };
  });

  // const cleannerId = () => {
  //   const imageApi = response.data.reference_image_id;
  //       const  clean  = {
  //         id: response.data.id,
  //         name: response.data.name,
  //         height: response.data.height.metric,
  //         weight: response.data.weight.metric,
  //         life_span: response.data.life_span,
  //         image: `https://cdn2.thedogapi.com/images/${imageApi}.jpg`,
  //         temperament: response.data?.temperament,
  //         createdByuser: false,
  //       };

  // }



  // const getDogById = async (id, source) => {
  //   if (source === "api") {
  //     const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)
  //     const imageApi = response.data.reference_image_id;
  //     let dogId = {
  //       id: response.data.id,
  //       name: response.data.name,
  //       height: response.data.height.metric,
  //       weight: response.data.weight.metric,
  //       life_span: response.data.life_span,
  //       image: `https://cdn2.thedogapi.com/images/${imageApi}.jpg`,
  //       temperament: response.data?.temperament,
  //       createdByuser: false,
  //     };
  //     console.log(dogId);
  //     return dogId
  //   }
module.exports = { cleanner };
