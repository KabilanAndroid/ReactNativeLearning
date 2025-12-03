import { RouteProp, useRoute } from "@react-navigation/native";
import { ScreenType } from "../utils/Types";

export const useAppRoute = <T extends keyof ScreenType>(): RouteProp<
  ScreenType,
  T
> => {
  return useRoute<RouteProp<ScreenType, T>>();
};