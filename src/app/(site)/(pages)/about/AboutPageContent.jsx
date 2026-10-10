import { Box, Container, Typography, Paper, Chip } from "@mui/material";
import { Person, School, EmojiEmotions } from "@mui/icons-material";

export default function AboutPageContent() {
  const colors = {
    primary: "#D4AF37",
    text: "#F5F5F5",
    textMuted: "rgba(245,245,245,0.7)",
    sectionBg:
      "linear-gradient(145deg, rgba(10, 31, 68, 0.7), rgba(26, 26, 46, 0.7))",
    border: "rgba(212, 175, 55, 0.2)",
  };

  return (
    <Box id="about" sx={{ minHeight: "100vh", pt: { xs: 8, md: 12 }, pb: 8 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            mb: { xs: 6, md: 10 },
            borderRadius: 4,
            background: colors.sectionBg,
            backdropFilter: "blur(12px)",
            border: `1px solid ${colors.border}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
            <Chip
              icon={<Person sx={{ fontSize: 16, color: colors.primary }} />}
              label="ABOUT ME"
              sx={{
                bgcolor: "rgba(212, 175, 55, 0.08)",
                color: colors.primary,
                border: `1px solid ${colors.border}`,
                fontWeight: 600,
                letterSpacing: "2px",
                fontSize: "10px",
                mb: { xs: 1.5, md: 2 },
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: colors.primary,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                fontFamily: "'Inter', sans-serif",
              }}
            >
              About Me
            </Typography>
          </Box>
          <Box sx={{ maxWidth: 900, mx: "auto" }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                lineHeight: { xs: 1.8, md: 1.9 },
                color: colors.text,
                textAlign: "left",
                fontFamily: "'Inter', sans-serif",
                mb: 2,
                px: { xs: 0, sm: 2 },
              }}
            >
              I&apos;m a Full-Stack Developer focused on building modern web
              applications with a strong interest in backend engineering,
              application security, and reliable system architecture.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                lineHeight: { xs: 1.8, md: 1.9 },
                color: colors.textMuted,
                textAlign: "left",
                fontFamily: "'Inter', sans-serif",
                mb: 2,
                px: { xs: 0, sm: 2 },
              }}
            >
              My work spans the full development lifecycle, from designing
              responsive interfaces with React, Next.js, and TypeScript to
              developing structured backend systems with Node.js, Express,
              NestJS, PostgreSQL, and Prisma.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                lineHeight: { xs: 1.8, md: 1.9 },
                color: colors.textMuted,
                textAlign: "left",
                fontFamily: "'Inter', sans-serif",
                px: { xs: 0, sm: 2 },
              }}
            >
              I pay particular attention to authentication, authorization,
              database design, session security, rate limiting, OTP/MFA flows,
              and defensive application design. My goal is to build software
              that is not only functional, but also maintainable, secure, and
              dependable in real-world use.
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <School sx={{ color: colors.primary, fontSize: 32 }} />
            <Typography
              variant="h3"
              sx={{
                color: colors.primary,
                fontWeight: 700,
                fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2.2rem" },
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Education
            </Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 3,
              background:
                "linear-gradient(145deg, rgba(26, 43, 77, 0.8), rgba(10, 31, 68, 0.8))",
              backdropFilter: "blur(10px)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: colors.primary,
                fontWeight: 700,
                mb: 0.5,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              Vocational High School Diploma in Computer Studies
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: colors.textMuted,
                mb: 1.5,
                fontWeight: 500,
                fontSize: "0.85rem",
              }}
            >
              Directorate of Education — Vocational &amp; Technical Education •
              2023 – 2026
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: colors.textMuted,
                lineHeight: 1.8,
                fontSize: "0.9rem",
              }}
            >
              Studied core computer science concepts and practical computing,
              with a focus on programming fundamentals, databases, networking,
              and software development.
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
          <Chip
            icon={
              <EmojiEmotions sx={{ fontSize: 16, color: colors.primary }} />
            }
            label="GET IN TOUCH"
            sx={{
              bgcolor: "rgba(212, 175, 55, 0.08)",
              color: colors.primary,
              border: `1px solid ${colors.border}`,
              fontWeight: 600,
              letterSpacing: "2px",
              fontSize: "10px",
              mb: { xs: 1.5, md: 2 },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: colors.primary,
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Let&apos;s Work Together
          </Typography>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 7 },
            borderRadius: 4,
            background: colors.sectionBg,
            backdropFilter: "blur(12px)",
            border: `1px solid ${colors.border}`,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: colors.primary,
              fontWeight: 700,
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
            }}
          >
            Have a project in mind?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: colors.text,
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
              maxWidth: 650,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            I&apos;m open to discussing software projects, development
            opportunities, and ideas that can be turned into practical digital
            products.
          </Typography>
          <Typography sx={{ color: colors.textMuted, fontSize: "0.9rem" }}>
            Contact:{" "}
            <a
              href="mailto:hdayaaslam34@gmail.com"
              style={{ color: colors.primary, textDecoration: "underline" }}
            >
              hdayaaslam34@gmail.com
            </a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
