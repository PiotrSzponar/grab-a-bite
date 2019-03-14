import axios from 'axios';
import { appId, appKey, proxy } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `${proxy}https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${
          this.id
        }&app_id=${appId}&app_key=${appKey}`
      );
      this.title = res.data[0].label;
      this.author = res.data[0].source;
      this.img = res.data[0].image;
      this.url = res.data[0].url;
      this.servings = res.data[0].yield;
      this.ingredients = res.data[0].ingredientLines;
      this.time =
        res.data[0].totalTime === 0
          ? Math.ceil(this.ingredients.length * 7)
          : res.data[0].totalTime;
      this.calories = Math.round(res.data[0].calories);
      this.fat = Math.round(res.data[0].totalNutrients.FAT.quantity);
      this.carb = Math.round(res.data[0].totalNutrients.CHOCDF.quantity);
      this.protein = Math.round(res.data[0].totalNutrients.PROCNT.quantity);
    } catch (error) {
      console.log(error);
      alert('Something went wrong :(');
    }
  }

  updateServings(type) {
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
    this.servings = newServings;
  }
}
