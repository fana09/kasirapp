# Gunakan image resmi Bun
FROM oven/bun:latest AS base

# Tentukan folder kerja di dalam server
WORKDIR /usr/src/app

# Salin file kebutuhan library (package.json dan bun.lockb)
COPY package.json bun.lockb ./

# Instal semua library menggunakan Bun
RUN bun install

# Salin seluruh file kode backend Anda ke dalam server
COPY . .

# Beritahu mesin bahwa kita menggunakan port 3000
EXPOSE 3000

# Perintah utama untuk menyalakan server
CMD [ "bun", "run", "index.ts" ]