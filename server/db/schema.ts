import { relations } from 'drizzle-orm'
import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

// sessions schema
export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
})

// accounts schema
export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

// verifications schema
export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

// users schema
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

// customers schema
export const customer = pgTable('customer', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  address: text('address'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

// invoices schema
export const invoice = pgTable('invoice', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
  customerId: uuid('customer_id')
    .references(() => customer.id)
    .notNull(),
  status: text('status').default('draft'), // 'paid' | 'unpaid' | 'draft'
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

// products schema
export const product = pgTable('product', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  price: numeric('price').notNull(),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

export const userRelations = relations(user, ({ many }) => ({
  invoices: many(invoice), // A user has many invoices
  products: many(product), // A user has many products
}))

export const customerRelations = relations(customer, ({ many }) => ({
  invoices: many(invoice), // A customer has many invoices
}))

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  user: one(user, {
    fields: [invoice.userId],
    references: [user.id],
  }),
  customer: one(customer, {
    fields: [invoice.customerId],
    references: [customer.id],
  }),
  products: many(product), // An invoice has many products
}))

export const productRelations = relations(product, ({ many, one }) => ({
  user: one(user, {
    fields: [product.userId],
    references: [user.id],
  }), // A product belongs to a user
  invoices: many(invoice), // A product has many invoices
}))
