import { Optional } from "sequelize";
import { TLead } from "./lead.interface";
import Lead from "./lead.model";

const createLead = async (payload: Optional<TLead, "id">): Promise<Lead> => {
  return await Lead.create(payload);
};

const getLeadsByPortfolioId = async (portfolioId: string): Promise<Lead[]> => {
  return await Lead.findAll({ where: { portfolioId } });
};

const updateLead = async (
  leadId: string,
  leadData: Partial<TLead>
): Promise<Lead> => {
  const lead = await Lead.findByPk(leadId);
  if (!lead) throw new Error("Lead not found");
  return await lead.update(leadData);
};

const deleteLead = async (leadId: string): Promise<void> => {
  const lead = await Lead.findByPk(leadId);
  if (!lead) throw new Error("Lead not found");
  await lead.destroy();
};

const LeadService = {
  createLead,
  updateLead,
  getLeadsByPortfolioId,
  deleteLead,
};

export default LeadService;
