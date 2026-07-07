import { Project } from "./types";
import airlineApi from "./airline-api";
import accommodationApi from "./accommodation-api";
import doctorAppointmentApi from "./doctor-appointment-api";
import dataMiningProject from "./data-mining-project";
import ecommerceRecommendationSystem from "./ecommerce-recommendation-system";
import newsPortal from "./news-portal";
import ecommerceLandingPage from "./ecommerce-fullstack-page";
import carpi from "./carpi";
import hotelBooking from "./hotel-booking";
import pusulaObs from "./pusula-obs";
import dijitalDonusumOfisi from "./dijital-donusum-ofisi";

const projects: Project[] = [
  carpi,
  pusulaObs,
  airlineApi,
  accommodationApi,
  doctorAppointmentApi,
  hotelBooking,
  dataMiningProject,
  ecommerceRecommendationSystem,
  newsPortal,
  ecommerceLandingPage,
  dijitalDonusumOfisi,
];

export default projects;
export type { Project, ProjectSection } from "./types";
