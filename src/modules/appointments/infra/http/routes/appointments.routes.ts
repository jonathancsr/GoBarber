import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsControlller = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//  const appointmentsRepository = new AppointmentsRepository();
//   const appointments = await appointmentRepository.find({
//     where: { provider_id: request.user.id },
//   });
//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsControlller.create);

export default appointmentsRouter;
