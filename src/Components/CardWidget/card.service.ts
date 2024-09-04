import axios from "axios";
import { API_URL } from "../../settings/api-settings";

export const cardService = {
    getKpiValue() {
        return axios.get(`${API_URL}/menu-screen-mapping/kpi-value`)
    }
}