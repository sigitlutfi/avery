// navigationUtils.js
import { CommonActions } from "@react-navigation/native";

export const replaceWithNestedStack = (
  navigation,
  stackName,
  screenName,
  params = {}
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: stackName,
          state: {
            routes: [
              {
                name: screenName,
                params: params,
              },
            ],
          },
        },
      ],
    })
  );
};
