import { Router } from "express";
import AuthRoutes from "../modules/auth/auth.route";
import LessonRoutes from "../modules/lesson/lesson.route";
import QuizRoute from "../modules/quiz/quiz.route";
import PollRoutes from "../modules/polls/poll.route";
import PollAnswerRoutes from "../modules/pollAnswer/pollAnswer.route";
import QuizTestResultRoute from "../modules/quizTestResult/quizTestResult.route";
import CommentRoutes from "../modules/comment/comment.route";
import WebinarRoutes from "../modules/webinar/webinar.route";
import PodcastRoute from "../modules/podcast/podcast.route";
import QAndARoute from "../modules/qAndA/qAndA.route";
import WebcastRoutes from "../modules/webcast/webcast.route";
import RegisteredWebinarRoutes from "../modules/registeredWebinar/registeredWebinar.route";
import ArticleRoutes from "../modules/articles/article.route";
import RatingRoutes from "../modules/rating/rating.route";
import StatisticsRoutes from "../modules/statistics/statistics.routes";
import JobRoutes from "../modules/job/job.route";
import ProjectRoutes from "../modules/project/project.route";
import InterviewRoutes from "../modules/interview/interview.route";
import ResearchAndDevelopmentRoutes from "../modules/researchAndDevelopment/researchAndDevelopment.route";
import BasicProfileRoutes from "../modules/profile/basicProfile/basicProfile.routes";
import CandidateRoutes from "../modules/profile/candidate/candidate.route";
import InterviewersRoute from "../modules/profile/interviewer/interviewer.routes";
import SkillRoutes from "../modules/skill/skill.route";
import CustomerRoutes from "../modules/profile/customer/customer.routes";
import AppliedJobRoutes from "../modules/appliedJob/appliedJob.route";
import ValueChainRoutes from "../modules/valueChain/valueChain.routes";
import PhoneNumber from "../modules/sms/sms.route";
import AdminRoute from "../modules/admin/admin.route";
import CRMsRoutes from "../modules/profile/crm/crm.routes";
import SRMsRoutes from "../modules/profile/srm/srm.routes";
import BOAsRoutes from "../modules/profile/boa/boa.routes";
import IRMsRoutes from "../modules/profile/irm/irm.routes";
import FOAsRoutes from "../modules/profile/foa/foa.routes";
import TOAsRoutes from "../modules/profile/toa/toa.routes";
import InvestorsRoutes from "../modules/profile/investor/investor.routes";
import ServiceProviderCompanyRoutes from "../modules/profile/serviceProviderCompany/serviceProviderCompany.routes";
import JobAssignmentToSRMRoutes from "../modules/jobAssignmentToSRM/jobAssignmentToSRM.routes";
import JobInvitationToCandidateRoutes from "../modules/jobInvitationToCandidate/jobInvitationToCandidate.routes";
import PortfolioRoute from "../modules/portfolio/portfolio.router";
import LeadRoute from "../modules/lead/lead.route";

const router = Router();

type TRouteModule = {
  path: string;
  route: Router;
};

const routerModules: TRouteModule[] = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/lessons",
    route: LessonRoutes,
  },
  {
    path: "/research-and-developments",
    route: ResearchAndDevelopmentRoutes,
  },
  {
    path: "/articles",
    route: ArticleRoutes,
  },
  {
    path: "/quiz",
    route: QuizRoute,
  },
  {
    path: "/polls",
    route: PollRoutes,
  },
  {
    path: "/poll-answers",
    route: PollAnswerRoutes,
  },
  {
    path: "/podcasts",
    route: PodcastRoute,
  },
  {
    path: "/quiz-test-result",
    route: QuizTestResultRoute,
  },
  {
    path: "/q-and-a",
    route: QAndARoute,
  },
  {
    path: "/comments",
    route: CommentRoutes,
  },
  {
    path: "/webinars",
    route: WebinarRoutes,
  },
  {
    path: "/registered-webinars",
    route: RegisteredWebinarRoutes,
  },
  {
    path: "/webcasts",
    route: WebcastRoutes,
  },
  {
    path: "/ratings",
    route: RatingRoutes,
  },
  { path: "/statistics", route: StatisticsRoutes },

  {
    path: "/jobs",
    route: JobRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/interviews",
    route: InterviewRoutes,
  },
  {
    path: "/crms",
    route: CRMsRoutes,
  },

  {
    path: "/srms",
    route: SRMsRoutes,
  },
  {
    path: "/boas",
    route: BOAsRoutes,
  },

  {
    path: "/irms",
    route: IRMsRoutes,
  },
  {
    path: "/foas",
    route: FOAsRoutes,
  },
  {
    path: "/toas",
    route: TOAsRoutes,
  },
  {
    path: "/investors",
    route: InvestorsRoutes,
  },
  {
    path: "/service-provider-companies",
    route: ServiceProviderCompanyRoutes,
  },
  {
    path: "/basic-profiles",
    route: BasicProfileRoutes,
  },
  {
    path: "/candidates",
    route: CandidateRoutes,
  },
  {
    path: "/customers",
    route: CustomerRoutes,
  },
  {
    path: "/interviewers",
    route: InterviewersRoute,
  },
  {
    path: "/skills",
    route: SkillRoutes,
  },
  {
    path: "/job-applications",
    route: AppliedJobRoutes,
  },
  { path: "/value-chains", route: ValueChainRoutes },
  {
    path: "/phonenumber-verification",
    route: PhoneNumber,
  },
  {
    path: "/job-assignment-to-srm",
    route: JobAssignmentToSRMRoutes,
  },
  {
    path: "/job-invitation-to-candidate",
    route: JobInvitationToCandidateRoutes,
  },
  {
    path: "/admin",
    route: AdminRoute,
  },
  {
    path:"/portfolio",
    route: PortfolioRoute
  },
  {
    path:"/lead",
    route:LeadRoute
  }
];

routerModules.forEach(routerModule => {
  router.use(routerModule.path, routerModule.route);
});
export default router;
