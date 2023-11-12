# Right To Education School List in Gujarat

This repo contains code to scrap the data of [all schools in Gujarat](https://rte.orpgujarat.com/Common/SchoolList)

All school data are stored in [data_final.json](./data_final.json) and [data_final.xlsx](./data_final.xlsx)

### Included Data for school

- School Name
- Dise Code
- Address
- Ward
- district
- board
- type
- medium
- location (Google map link)

# For Development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
