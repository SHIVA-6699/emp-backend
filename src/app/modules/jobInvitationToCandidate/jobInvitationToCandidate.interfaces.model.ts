import { DataTypes, Model } from "sequelize";
import { TJobInvitationToCandidate } from "./jobInvitationToCandidate.interfaces";
import Candidate from "../profile/candidate/candidate.model";
import Job from "../job/job.model";
import SRM from "../profile/srm/srm.model";
import JobAssignmentToSRM from "../jobAssignmentToSRM/jobAssignmentToSRM.model";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import { TStatus } from "../jobAssignmentToSRM/jobAssignmentToSRM.interface";

class JobInvitationToCandidate
  extends Model<TJobInvitationToCandidate>
  implements TJobInvitationToCandidate
{
  public id!: string;
  public jobId!: string;
  public candidateId!: string;
  public srmId!: string;
  public jobAssignmentToSRMId!: string;
  public status!: TStatus;
}

JobInvitationToCandidate.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    candidateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Candidate,
        key: "id",
      },
    },
    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Job,
        key: "id",
      },
    },
    srmId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SRM,
        key: "id",
      },
    },
    jobAssignmentToSRMId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: JobAssignmentToSRM,
        key: "id",
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
    modelName: "JobInvitationToCandidate",
  }
);

//1. association between job invitation and job
Job.hasMany(JobInvitationToCandidate, {
  foreignKey: "jobId",
  as: "jobInvitations",
});

JobInvitationToCandidate.belongsTo(Job, {
  foreignKey: "jobId",
  as: "job",
});

// 2. association between job invitation and candidate
Candidate.hasMany(JobInvitationToCandidate, {
  foreignKey: "candidateId",
  as: "jobInvitations",
});

JobInvitationToCandidate.belongsTo(Candidate, {
  foreignKey: "candidateId",
  as: "candidate",
});

// 3. association between job invitation and srm
SRM.hasMany(JobInvitationToCandidate, {
  foreignKey: "srmId",
  as: "jobInvitations",
});

JobInvitationToCandidate.belongsTo(SRM, {
  foreignKey: "srmId",
  as: "srm",
});

//4. association between job invitation and job assignments
JobAssignmentToSRM.hasMany(JobInvitationToCandidate, {
  foreignKey: "jobAssignmentToSRMId",
  as: "jobInvitations",
});

JobInvitationToCandidate.belongsTo(JobAssignmentToSRM, {
  foreignKey: "jobAssignmentToSRMId",
  as: "jobAssignmentToSRM",
});
export default JobInvitationToCandidate;
