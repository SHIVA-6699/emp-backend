import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import Job from "../job/job.model";
import Candidate from "../profile/candidate/candidate.model";
import { TAppliedJobAttributes } from "./appliedJob.interface";

class AppliedJob
  extends Model<TAppliedJobAttributes>
  implements TAppliedJobAttributes
{
  public id!: string;
  public jobId!: string;
  public candidateId!: string;
  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

AppliedJob.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    jobId: {
      type: DataTypes.UUID,
      references: {
        key: "id",
        model: Job,
      },
    },
    candidateId: {
      type: DataTypes.UUID,
      references: {
        key: "id",
        model: Candidate,
      },
    },
  },
  { sequelize: sequelizeConnection, modelName: "AppliedJob", timestamps: true }
);

Job.hasMany(AppliedJob, {
  foreignKey: "jobId",
  as: "appliedJobs",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

AppliedJob.belongsTo(Job, {
  foreignKey: "jobId",
  as: "job",
});

Candidate.hasMany(AppliedJob, {
  foreignKey: "candidateId",
  as: "appliedJobs",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

AppliedJob.belongsTo(Candidate, {
  foreignKey: "candidateId",
  as: "candidate",
});

export default AppliedJob;
