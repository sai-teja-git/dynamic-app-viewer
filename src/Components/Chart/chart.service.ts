import axios from "axios";
import { API_URL } from "../../settings/api-settings";

export const chartService = {
    monthChartData() {
        return axios.get(`${API_URL}/menu-screen-mapping/graph-data`)
    }
}