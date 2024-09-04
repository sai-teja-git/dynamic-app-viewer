import axios from "axios"
import { API_URL } from "../../settings/api-settings"

export const tableService = {

    tableData() {
        return axios.get(`${API_URL}/menu-screen-mapping/table-data`)
    }

}