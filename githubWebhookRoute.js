import express from 'express';
import { handleGitHubWebhookRequest } from './githubWebhookController.js';

const handleGitHubWebhookRoute = express.Router();

handleGitHubWebhookRoute.post('/webhook', handleGitHubWebhookRequest);

export default handleGitHubWebhookRoute;
