import { BSCharacteristic, BSProfile, Profile, TypeName } from "../types";
import { isBSCharacteristic } from "../guards";
import { v4 as uuidv4 } from "uuid";

abstract class ProfileConverter<
  S extends Profile<TypeName>,
  T extends BSCharacteristic,
> {
  private profile: S;

  protected constructor(profile: Omit<S, "id">) {
    this.profile = { ...profile, id: uuidv4() } as S;
  }

  convert(bsProfile: BSProfile<T>): S {
    this.profile.name = bsProfile.$.name || "-";

    bsProfile.characteristics.forEach((bsCharacteristic) => {
      if (isBSCharacteristic(bsCharacteristic)) {
        bsCharacteristic.characteristic.forEach((bsCharacteristic) => {
          Object.assign(this.profile, this.getProperty(bsCharacteristic));
        });
      }
    });

    return this.profile;
  }

  protected abstract getProperty(bsCharacteristic: T): Partial<S>;
}

export default ProfileConverter;
