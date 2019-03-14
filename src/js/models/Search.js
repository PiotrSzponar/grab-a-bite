import axios from 'axios';
import { appId, appKey, proxy } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(
        `${proxy}https://api.edamam.com/search?q=${
          this.query
        }&app_id=${appId}&app_key=${appKey}&to=100`
      );
      this.result = res.data.hits;
    } catch (error) {
      alert(error);
    }
  }
}
