import { relations, } from "drizzle-orm";
import { boolean, date, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const paymentTable = pgTable("userpayment",
    {
        id:integer().generatedAlwaysAsIdentity().primaryKey(),
        email:text("email"),
        mobileno:text("MobileNumber").notNull(),
        country:text("Country"),
        pincode:text("Pincode").notNull().default("000000"),
        panno:text("PANNO"),
        address:varchar({
          length:255
        }),
        amount:integer().notNull(),
        username:text("username").notNull(),
        campaignsid:integer("campaign_id").references(()=>campaigns.id),
        createdate:timestamp("created_at").notNull().defaultNow(),
        paymentstatus:boolean("payment_status").notNull().default(false),
        orderid:varchar({
          length:255
        }).notNull(),
        isananymous:boolean("isanonymous").notNull().default(false)
    }
)
export const campaigns = pgTable('campaigns', {
    id: serial('id').primaryKey(),
    campaignName: varchar('campaign_name', { length: 255 }).notNull(),
    targetAmount: integer('target_amount').notNull(),
    imgurl:varchar('image_url',{length:255}),
    phoneno:text("phoneno"),
    startdate: timestamp('startdate').notNull().defaultNow(),
    enddate:date("end_date").notNull(),
    preacherName:varchar('preacher_name',{length:255}).notNull(),
    raisedtotal:integer("raised_total").notNull().default(0),
    funderstotal:integer("funders_totaltotal").notNull().default(0)
  });


  export const campaignRelation = relations(campaigns, ({ many }) => ({
    payment: many(paymentTable), 
  }));
  
  export const paymentRelation = relations(paymentTable, ({ one }) => ({
    campaign: one(campaigns),
  }));
  

