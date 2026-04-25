import { 
  createSerializer, 
  parseAsInteger, 
  parseAsString,
  inferParserType
} from 'nuqs/server'

export const usersSearchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString.withDefault(''),
  role: parseAsString.withDefault('all'),
  status: parseAsString.withDefault('all'),
}

export type UsersSearch = inferParserType<typeof usersSearchParams>

export const serializeUsersSearch = createSerializer(usersSearchParams)
