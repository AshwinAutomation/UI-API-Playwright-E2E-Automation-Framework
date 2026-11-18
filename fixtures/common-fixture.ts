import {test as baseTest } from '../fixtures/pom-fixture';
import commonUtils from '../utils/commonUtils';

type commonFixtureType = {
  commonUtils: commonUtils;
}

export const test = baseTest.extend<commonFixtureType>({
  commonUtils : async({}, use)=>{
      use(new commonUtils());
  }
})