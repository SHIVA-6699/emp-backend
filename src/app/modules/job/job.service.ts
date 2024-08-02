import AppliedJob from "../appliedJob/appliedJob.model";
import BasicProfile from "../profile/basicProfile/basicProfile.model";
import Candidate from "../profile/candidate/candidate.model";
import User from "../user/user.model";
import { TJobInput, TJobOutput } from "./job.interface";
import Job from "./job.model";

const create = async (payload: TJobInput): Promise<TJobOutput> => {
  const jobExisted = await Job.findOne({ where: { jobId: payload.jobId } });
  if (jobExisted) {
    await jobExisted.update(payload);
    return jobExisted.dataValues;
  }
  const result = await Job.create(payload);
  return result.dataValues;
};

const getAll = async (): Promise<TJobOutput[]> => {
  const result = await Job.findAll();
  return result;
};

const getDetails = async (payload: {
  jobId: string;
  userId: string;
}): Promise<TJobOutput | null> => {
  const result = await Job.findOne({ where: { id: payload.jobId } });
  
  if (!result) {
    return null;
  }

  // Initialize the `alreadyApplied` property to false
  const jobDetails: TJobOutput = {
    ...result.dataValues,
    alreadyApplied: false,
  };

  // Check if user has a candidate profile
  const hasCandidateProfile = await Candidate.findOne({
    where: {
      userId: payload.userId,
    },
  });

  if (hasCandidateProfile) {
    // Check if the candidate has already applied
    const hasAlreadyApplied = await AppliedJob.findOne({
      where: { jobId: result.id, candidateId: hasCandidateProfile.id },
    });

    if (hasAlreadyApplied) {
      jobDetails.alreadyApplied = true;
    }
  }

  return jobDetails;
};

const getDetailsWithCandidateAndInvitees = async (payload: string) => {
  const isJobExits = await Job.findOne({ where: { id: payload } });

  if (!isJobExits) {
    return null;
  }

  const result = await Job.findOne({
    where: { id: payload },
    include: [
      {
        model: AppliedJob,
        as: "appliedJobs",
        attributes: ["candidateId"],
        include: [
          {
            model: Candidate,
            as: "candidate",
            include: [
              {
                model: User,
                as: "user",
                attributes: ["email"],
                include: [
                  {
                    model: BasicProfile,
                    as: "basicProfile",
                    attributes: ["first_name", "last_name"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  return result?.dataValues;
};

export const JobService = {
  create,
  getAll,
  getDetails,
  getDetailsWithCandidateAndInvitees,
};
