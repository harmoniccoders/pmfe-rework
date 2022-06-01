// import axios from 'axios';
// //@ts-ignore
// import { ServiceView, ServiceViewStandardResponse } from 'types/api';
// import https from 'https';

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });
// export class ServicesService {
//   baseURL: string;

//   constructor(baseURL: string) {
//     this.baseURL = baseURL;
//   }

//   public getServiceById = async (id: string): Promise<ServiceView> => {
//     console.log(this.baseURL);

//     try {
//       const result: ServiceViewStandardResponse = await (
//         await axios.get(`${this.baseURL}api/services/${id}`, {
//           httpsAgent: agent,
//         })
//       ).data;
//       return await new Promise<ServiceView>((resolve, reject) => {
//         resolve(result.data as ServiceView);
//       });
//     } catch (error) {
//       return new Promise<ServiceView>((resolve, reject) => {
//         reject(error);
//       });
//     }
//   };

//   public static generateServiceLogoUrl = (logoReference: string) =>
//     logoReference
//       ? `${process.env.NEXT_PUBLIC_FILE_SERVICE_BASEURL}/api/file/${logoReference}/${process.env.NEXT_PUBLIC_FILE_SERVICE_KEY}`
//       : null;
// }
import React from 'react';

function ServicesService() {
  return <div>ServicesService</div>;
}

export default ServicesService;
