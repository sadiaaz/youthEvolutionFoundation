import { type SchemaTypeDefinition } from 'sanity'

import program from './program'
import project from './project'
import impactStory from './impactStory'
import partner from './partner'
import about from './about'
import value from './values'
import leadership from './leadership'
import team from './team'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, project, impactStory, partner, about, value, leadership, team],
}