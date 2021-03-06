PGDMP     1    7                y            DB_Panel    14.1    14.1     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    49152    DB_Panel    DATABASE     n   CREATE DATABASE "DB_Panel" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "DB_Panel";
                postgres    false            ?            1259    49159    tbl_products    TABLE     ?   CREATE TABLE public.tbl_products (
    id_products integer NOT NULL,
    product_image character varying(200),
    product_name character varying(200),
    product_desc text,
    "userID" integer NOT NULL
);
     DROP TABLE public.tbl_products;
       public         heap    postgres    false            ?            1259    49162    tbl_Products_id_products_seq    SEQUENCE     ?   ALTER TABLE public.tbl_products ALTER COLUMN id_products ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."tbl_Products_id_products_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            ?            1259    49154 	   tbl_users    TABLE     ?   CREATE TABLE public.tbl_users (
    id integer NOT NULL,
    email character varying(200),
    password character varying(200),
    gender integer,
    name character varying(200),
    "profilePic" character varying(200)
);
    DROP TABLE public.tbl_users;
       public         heap    postgres    false            ?            1259    49153    tbl_users_id_seq    SEQUENCE     ?   ALTER TABLE public.tbl_users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            ?          0    49159    tbl_products 
   TABLE DATA           h   COPY public.tbl_products (id_products, product_image, product_name, product_desc, "userID") FROM stdin;
    public          postgres    false    211   ?       ?          0    49154 	   tbl_users 
   TABLE DATA           T   COPY public.tbl_users (id, email, password, gender, name, "profilePic") FROM stdin;
    public          postgres    false    210   z       ?           0    0    tbl_Products_id_products_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."tbl_Products_id_products_seq"', 11, true);
          public          postgres    false    212            ?           0    0    tbl_users_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.tbl_users_id_seq', 5, true);
          public          postgres    false    209            f           2606    49169    tbl_products tbl_Products_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.tbl_products
    ADD CONSTRAINT "tbl_Products_pkey" PRIMARY KEY (id_products);
 J   ALTER TABLE ONLY public.tbl_products DROP CONSTRAINT "tbl_Products_pkey";
       public            postgres    false    211            b           2606    49158    tbl_users tbl_users_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.tbl_users DROP CONSTRAINT tbl_users_pkey;
       public            postgres    false    210            c           1259    57354    fki_fk_userID    INDEX     L   CREATE INDEX "fki_fk_userID" ON public.tbl_products USING btree ("userID");
 #   DROP INDEX public."fki_fk_userID";
       public            postgres    false    211            d           1259    57360 	   fki_fkskd    INDEX     F   CREATE INDEX fki_fkskd ON public.tbl_products USING btree ("userID");
    DROP INDEX public.fki_fkskd;
       public            postgres    false    211            g           2606    57355    tbl_products fkskd    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tbl_products
    ADD CONSTRAINT fkskd FOREIGN KEY ("userID") REFERENCES public.tbl_users(id) ON DELETE CASCADE NOT VALID;
 <   ALTER TABLE ONLY public.tbl_products DROP CONSTRAINT fkskd;
       public          postgres    false    210    3170    211            ?   ?   x?=??n?0?????'@q???J
?P?
!qq?L??G}???8?V???? Q???J6??8??M???!??9???ݗJ(??Q?d?????%ܝ]??2?Gw?%?P	?լn?????[~???
?????Y??\q?Zڊ?%6>???xù?R?3???7??yk&?V0?\??Wvf?nM?g?B??w?D      ?   ?  x?e??r?@??5>E??i.??"?tS?iB?"4??>}?L?bܞSu?:?,t??%y?g??ə0??TS?rZ?W~?J?^??)?IhZi????`_fy!흛?Ն?:?%?x??~QPt ?nE<Wt???v???	m?ƕD??*??n('>??V????Z>#2??Npnvvi;pA?M?AGH??2???U\?2?c?;I?>??!????-΂~[嫸?W??K???;x?p?f???P5????ܓr??ngۻ`?'?+1??뛗?>]??iUL?U?7_?^???ᐊ?a?i㜰
?????q??]i??B?%@n?I??ru??20??ͬ??S?J?A?? {????eFBJ??+Z?aJF??8?L?N???     