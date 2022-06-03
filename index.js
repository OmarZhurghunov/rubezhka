CREATE TABLE IF NOT EXISTS "baskets" (
    "id" INTEGER NOT NULL DEFAULT 'nextval(...)',
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    PRIMARY KEY ("id")
)

-
CREATE TABLE IF NOT EXISTS "basket_products" (
    "quantity" INTEGER NULL DEFAULT '1',
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "basket_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    PRIMARY KEY ("basket_id", "product_id"),
    CONSTRAINT "basket_products_basket_id_fkey" FOREIGN KEY ("basket_id")
    REFERENCES "public"."baskets" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "basket_products_product_id_fkey" FOREIGN KEY ("product_id")
    REFERENCES "public"."products" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "brands" (
    "id" INTEGER NOT NULL DEFAULT 'nextval(...)',
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    PRIMARY KEY ("id"),
    UNIQUE INDEX "brands_name_key" ("name")
);


CREATE TABLE IF NOT EXISTS "categories" (
    "id" INTEGER NOT NULL DEFAULT 'nextval(...)',
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    PRIMARY KEY ("id"),
    UNIQUE INDEX "categories_name_key" ("name")
);


CREATE TABLE IF NOT EXISTS "products" (
    "id" INTEGER NOT NULL DEFAULT 'nextval(...)',
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "rating" INTEGER NULL DEFAULT '0',
    "image" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "category_id" INTEGER NULL DEFAULT NULL,
    "brand_id" INTEGER NULL DEFAULT NULL,
    PRIMARY KEY ("id"),
    UNIQUE INDEX "products_name_key" ("name"),
    CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id")
    REFERENCES "public"."brands" ("id") ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id")
    REFERENCES "public"."categories" ("id") ON UPDATE CASCADE ON DELETE RESTRICT
);


CREATE TABLE IF NOT EXISTS "product_props" (
    "id" INTEGER NOT NULL DEFAULT 'nextval(...)',
    "name" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "product_id" INTEGER NULL DEFAULT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "product_props_product_id_fkey" FOREIGN KEY ("product_id"
    REFERENCES "public"."products" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "ratings" (
    "rate" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    PRIMARY KEY ("product_id", "user_id"),
    CONSTRAINT "ratings_product_id_fkey" FOREIGN KEY ("product_id")
    REFERENCES "public"."products" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id")
    REFERENCES "public"."users" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "users" (
    "id" INTEGER NOT NULL DEFAULT 'nextval(...)',
    "email" VARCHAR(255) NULL DEFAULT NULL,
    "password" VARCHAR(255) NULL DEFAULT NULL,
    "role" VARCHAR(255) NULL DEFAULT 'USER',
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    PRIMARY KEY ("id"),
    UNIQUE INDEX "users_email_key" ("email")
);
