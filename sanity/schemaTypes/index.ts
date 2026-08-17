import { type SchemaTypeDefinition } from 'sanity'

import program from './program'
import project from './project'
import impactStory from './impactStory'
import partner from './partner'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, project, impactStory, partner],
}