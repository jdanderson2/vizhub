import { identifyAgent } from './identifyAgent';
import { identifyOwner } from './identifyOwner';
import { accessControl } from './accessControl';
import { getVizInfo } from './getVizInfo';
import { getConnection } from 'vizhub-server-gateways';

export const shareDBMiddleware = shareDB => {

  // Populates request.agent.userId or request.agent.isServer.
  //
  // This ShareDB middleware triggers when new connections are made,
  // whether from the browser or from the server.
  shareDB.use('connect', identifyAgent);

  // Populates request.vizInfo with the VisualitionInfo document
  // corresponding to the document to which the op is being applied.
  shareDB.use('apply', getVizInfo(getConnection()));

  // Populates request.owner with the user id of the owner of the document
  // to which the op is being applied.
  shareDB.use('apply', identifyOwner);

  // This middleware applies access control rules to all ops (changes).
  shareDB.use('apply', accessControl);

};
