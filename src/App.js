import 'typeface-roboto'
import React, { useState, useEffect } from 'react'
import BasicTable from './Table'
import fetcher from './fetcher'
import MyScatter from './Scatter'
import Webframe from './Webframe'
import HSlider from './HSlider'
import VSlider from './VSlider'
import Grid from '@material-ui/core/Grid';


const App = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState([0, 100]);
  const [ratingRange, setRatingRange] = React.useState([0, 100]);

  useEffect(() => {
    fetcher.get_products("fake_query")
      .then(data => {
        setProducts(data);
        return data;
      })
    // .then(data => {
    //   Promise.all([
    //     data.map((item, index) => {
    //       fetcher.fetch_review_meta(item.asin)
    //         .then(meta_result => {
    //           let new_rating = meta_result.rating;
    //           let new_count = meta_result.count;
    //           if (new_rating !== "" && new_count !== "") {
    //             new_rating = parseFloat(new_rating);
    //             new_count = parseInt(new_count);
    //             let product_copy = { ...item };
    //             product_copy.rating = new_rating;
    //             product_copy.reviews = new_count;
    //             setProducts(products => products.map(product =>
    //               product.asin !== product_copy.asin ? product : product_copy));
    //           }
    //         })
    //     })
    //   ])
    // })
  }, [])

  return (
    <Grid container alignItems="flex-start">
      <Grid container item xs={6}>
        <Grid container item spacing={0}>
          <Grid item xs={5}>
            {MyScatter(products, "price", "rating", "Price", "Rating")}
            {HSlider(priceRange, setPriceRange)}
          </Grid>
          <Grid item xs={1}>
            {VSlider(ratingRange, setRatingRange)}
          </Grid>
          <Grid item xs={5}>
            {MyScatter(products, "rating", "reviews", "Rating", "Reviews")}
            {HSlider(ratingRange, setRatingRange)}
          </Grid>
          <Grid item xs={1}>
            {VSlider(ratingRange, setRatingRange)}
          </Grid>
        </Grid>
        <Grid item>
          {BasicTable(products, selected, setSelected)}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        {Webframe("https://www.amazon.com/dp/" + selected[0])}
      </Grid>
    </Grid>
  )
};

export default App;