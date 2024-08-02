import { DataTypes, Model } from "sequelize";
import { TCertificateAttributes } from "./certificate.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import Skill from "../skill/skill.model";
import File from "../file/file.model";

class Certificate
  extends Model<TCertificateAttributes>
  implements TCertificateAttributes
{
  public id!: string;
  public name!: string;
  public issuing_date!: Date;
  public issuing_organization!: string;
  public expiry_date!: Date;
  public credential_id!: string;
  public credential_url!: string;

  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

Certificate.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issuing_organization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issuing_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    credential_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credential_url: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Certificate" }
);

export class CertificateSkill extends Model {}
CertificateSkill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "CertificateSkill",
    timestamps: false,
  }
);

// association between certificate and skills
Certificate.belongsToMany(Skill, {
  through: CertificateSkill,
  as: "skills",
  foreignKey: "certificateId",
});
Skill.belongsToMany(Certificate, {
  through: CertificateSkill,
  as: "skills",
  foreignKey: "skillId",
});

export class CertificateFiles extends Model {}
CertificateFiles.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "CertificateFiles",
    timestamps: false,
  }
);
// association between certificate and files (image files)
Certificate.belongsToMany(File, {
  through: CertificateFiles,
  as: "files",
  foreignKey: "certificateId",
});
File.belongsToMany(Certificate, {
  through: CertificateFiles,
  as: "files",
  foreignKey: "fileId",
});

export default Certificate;
