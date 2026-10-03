import { type SchemaTypeDefinition } from 'sanity'
import heroBanner from './heroBanner'
import program from './program'
import project from './project'
import impactStory from './impactStory'
import partner from './partner'
import about from './about'
import value from './values'
import leadership from './leadership'
import team from './team'
import testimonial from './testimonial'
import event from './event'
import eventsPage from './eventsPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroBanner,
    program,
    project,
    impactStory,
    partner,
    about,
    value,
    leadership,
    team,
    testimonial,
    event,
    eventsPage,
  ],
}