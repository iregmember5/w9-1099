export const sanitizeSubdomain = (input: string): string => {
  return input.toLowerCase().replace(/[^a-z0-9-]/g, '');
};

export const generateSubdomainUrl = (subdomain: string): string => {
  return `https://${subdomain}.cms.com`;
};