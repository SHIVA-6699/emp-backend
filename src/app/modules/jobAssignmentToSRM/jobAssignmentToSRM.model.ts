import { DataTypes, Model } from "sequelize";
import { TJobAssignmentToSRM, TStatus } from "./jobAssignmentToSRM.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import Job from "../job/job.model";
import CRM from "../profile/crm/crm.model";
import SRM from "../profile/srm/srm.model";

class JobAssignmentToSRM
  extends Model<TJobAssignmentToSRM>
  implements TJobAssignmentToSRM
{
  public id!: string;
  public jobId!: string;
  public crmId!: string;
  public srmId!: string;
  public status!: TStatus;
}

JobAssignmentToSRM.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: "id",
        model: Job,
      },
    },
    crmId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: "id",
        model: CRM,
      },
    },
    srmId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: "id",
        model: SRM,
      },
    },
    status: {
      type: DataTypes.ENUM("PENDING", "ACCEPTED", "REJECTED"),
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "JobAssignmentToSRM",
  }
);

// association between jobAssignment and job
Job.hasMany(JobAssignmentToSRM, {
  foreignKey: "jobId",
  as: "jobAssignmentsToSRM",
});

JobAssignmentToSRM.belongsTo(Job, {
  foreignKey: "jobId",
  as: "job",
});

// association between jobAssignment and crm
CRM.hasMany(JobAssignmentToSRM, {
  as: "jobAssignmentsToSRM",
  foreignKey: "crmId",
});

JobAssignmentToSRM.belongsTo(CRM, {
  foreignKey: "crmId",
  as: "crm",
});
// association between jobAssignment and srm
SRM.hasMany(JobAssignmentToSRM, {
  foreignKey: "srmId",
  as: "jobAssignmentsToSRM",
});

JobAssignmentToSRM.belongsTo(SRM, {
  as: "srm",
  foreignKey: "srmId",
});
export default JobAssignmentToSRM;
