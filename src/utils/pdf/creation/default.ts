import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { flatten } from 'lodash';

import {
  Color,
  Experience,
  Organization,
  ResumeBody,
  SocialMedia,
  Education,
  Certification,
  Skill,
  Language,
} from '@models/resume';
import { theme, svg, links } from '@constants/options';

const { vfs } = vfsFonts.pdfMake;

pdfMake.fonts = {
  NotoSansKR: {
    normal: 'NotoSansKR-Regular.otf',
    bold: 'NotoSansKR-Bold.otf',
  },
  Rubik: {
    normal: 'Rubik-Regular.ttf',
    bold: 'Rubik-Bold.ttf',
  },
};

pdfMake.vfs = vfs;

const buildExperienceTable = (experiences: Experience[], color: Color) => experiences?.map((experience, index, arr) => ([
  {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*'],
      body: [
        [
          {
            columns: [
              { text: `${experience.role || 'Role'}, ${experience.company || 'Company'}`, style: 'strong', width: 'auto', alignment: 'bottom' },
              { text: experience.link, style: ['small', 'link'], width: '*', alignment: 'bottom', color: theme[color].normal },
            ],
            columnGap: 8,
          },
        ],
        [{ text: `${experience.location || 'Location'}, ${experience.startDate || '2020. 01. 01'} - ${experience.endDate || 'Present'}`, style: 'small' }],
        [{ text: experience.description || 'Describe your experience...', style: 'content' }],
      ],
    },
  },
  index < arr.length - 1 ? {
    text: ' ',
    style: 'margin-8',
  } : null,
]));

const buildOrganizationTable = (organizations: Organization[], color: Color) => organizations?.map((organization, index, arr) => ([
  {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*'],
      body: [
        [
          {
            columns: [
              { text: organization.title || 'Organization', style: 'strong', width: 'auto', alignment: 'bottom' },
              { text: organization.link, style: ['small', 'link'], width: '*', alignment: 'bottom', color: theme[color].normal },
            ],
            columnGap: 8,
          },
        ],
        [{ text: `${organization.location || 'Location'}, ${organization.startDate || '2020. 01. 01'} - ${organization.endDate || 'Present'}`, style: 'small' }],
        [{ text: organization.description || 'Describe your organization...', style: 'content' }],
      ],
    },
  },
  index < arr.length - 1 ? {
    text: ' ',
    style: 'margin-8',
  } : null,
]));

const buildSocialMediaTable = (socialMedias: SocialMedia[]) => socialMedias?.map((socialMedia) => {
  if (Boolean(socialMedia.type) && Boolean(socialMedia.id)) {
    return [
      {
        svg: svg[socialMedia.type],
        width: 12,
        height: 12,
      },
      {
        text: socialMedia.id,
        link: `${links[socialMedia.type]}${socialMedia.id}`,
        width: 'auto',
        style: 'social',
      },
    ];
  }

  return [];
});

const buildEducation = (educations: Education[]) => educations?.map((education, index, arr) => ([
  {
    text: [
      {
        text: education.schoolName || 'School',
        style: 'strong',
      },
      ' ',
      {
        text: `${education.schoolLocation || 'Location'}, ${education.startDate || '2020. 01. 01'}~${education.endDate || 'Present'}`,
        style: 'small',
      },
    ],
  },
  {
    text: education.degree,
    style: 'content',
  },
  {
    text: Boolean(education.gpa) ? `GPA: ${education.gpa}` : null,
    style: 'content',
  },
  index < arr.length - 1 ? {
    text: ' ',
    style: 'margin-4',
  } : null,
]));

const buildCertification = (certifications: Certification[]) => certifications?.map((certification, index, arr) => {
  if (Boolean(certification.certificationName)) {
    return [
      {
        text: [
          {
            text: certification.certificationName,
            style: 'strong',
          },
          certification.date != null ? ' ' : null,
          {
            text: certification.date,
            style: 'small',
          },
        ],
      },
      index < arr.length - 1 ? {
        text: ' ',
        style: 'margin-4',
      } : null,
    ];
  }

  return [];
});

const buildSkillTable = (skills: Skill[], color: Color) => skills?.map((skill, index, arr) => {
  if (Boolean(skill.skillName)) {
    return [
      {
        text: skill.skillName || 'Skill',
        style: 'strong',
      },
      {
        text: ' ',
        style: 'margin-4',
      },
      {
        svg: `
          <svg width="100%" height="5">
            <rect x="0" rx="4" width="100%" height="5" fill="${theme[color].lighten}"></rect>
            <rect x="0" rx="4" height="5" fill="${theme[color].darken}" width="${Number(skill.rate) * 10}%"></rect>
          </svg>
        `,
        width: 150,
        height: 5,
      },
      index < arr.length - 1 ? {
        text: ' ',
        style: 'margin-4',
      } : null,
    ];
  }

  return [];
});

const buildLanguageTable = (languages: Language[]) => languages?.map((language, index, arr) => {
  if (Boolean(language.language)) {
    return [
      {
        text: [
          {
            text: language.language,
            style: 'strong',
          },
          ' ',
          {
            text: language.proficiency,
            style: 'small',
          },
        ],
      },
      index < arr.length - 1 ? {
        text: ' ',
        style: 'margin-4',
      } : null,
    ];
  }

  return [];
});

const generate = ({
  color,
  firstName,
  lastName,
  bio,
  profile,
  city,
  country,
  phoneNumber,
  email,
  homepage,
  experiences,
  organizations,
  socialMedias,
  educations,
  certifications,
  skills,
  languages,
}: ResumeBody) => {
  const socialMediaTable = flatten(buildSocialMediaTable(socialMedias));
  const experienceTable = flatten(buildExperienceTable(experiences, color));
  const organizationTable = flatten(buildOrganizationTable(organizations, color));
  const educationTable = flatten(buildEducation(educations));
  const certificationTable = flatten(buildCertification(certifications));
  const skillTable = flatten(buildSkillTable(skills, color));
  const languageTable = flatten(buildLanguageTable(languages));

  const content = [
    {
      text: firstName.match(/[가-힣]/) != null && lastName.match(/[가-힣]/) != null
        ? `${lastName} ${firstName}`
        : `${firstName} ${lastName}`,
      style: 'title',
    },
    {
      columns: socialMediaTable.length === 0 ? [] : [{ text: ' ', width: '*' }, ...socialMediaTable],
      columnGap: 4,
    },
    profile ? [{
      image: 'profile',
      width: 72,
      height: 72,
    }, {
      text: ' ',
      style: 'margin-8',
    }] : null,
    city != null || country != null ? {
      text: `Location: ${[city, country].filter(Boolean).join(', ')}`,
      style: 'info',
    } : null,
    phoneNumber != null ? {
      text: `Phone: ${phoneNumber}`,
      style: 'info',
    } : null,
    email != null ? {
      text: `Email: ${email}`,
      style: 'info',
    } : null,
    (city != null || country != null) || phoneNumber != null || email != null ? {
      text: ' ',
      style: 'margin-16',
    } : null,
    {
      text: bio,
      style: 'bio',
    },
    experienceTable.length > 0 ? [{
      text: ' ',
      style: 'margin-16',
    },
    {
      text: 'WORK EXPERIENCE',
      style: 'sectionHeader',
    }] : [],
    ...experienceTable,
    organizationTable.length > 0 ? [{
      text: ' ',
      style: 'margin-16',
    }, {
      text: 'ORGANIZATION',
      style: 'sectionHeader',
    }] : [],
    ...organizationTable,
    educationTable.length > 0 ? [{
      text: ' ',
      style: 'margin-16',
    }, {
      text: 'EDUCATION',
      style: 'sectionHeader',
    }] : [],
    ...educationTable,
    certificationTable.length > 0 ? [{
      text: ' ',
      style: 'margin-16',
    }, {
      text: 'CERTIFICATION',
      style: 'sectionHeader',
    }] : [],
    ...certificationTable,
    skillTable.length > 0 ? [{
      text: ' ',
      style: 'margin-16',
    }, {
      text: 'SKILL',
      style: 'sectionHeader',
    }] : [],
    ...skillTable,
    languageTable.length > 0 ? [{
      text: ' ',
      style: 'margin-16',
    }, {
      text: 'LANGUAGE',
      style: 'sectionHeader',
    }] : [],
    ...languageTable,
  ].filter(Boolean) as any;

  const creation = pdfMake.createPdf({
    info: {
      title: `${firstName}'s resume`,
      author: `${firstName} ${lastName}`,
    },
    defaultStyle: {
      font: 'NotoSansKR',
    },
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    content,
    images: {
      profile: (profile || undefined)!,
    },
    styles: {
      title: {
        fontSize: 28,
        alignment: 'center',
        lineHeight: 1.2,
        color: theme[color].darken,
      },
      sectionHeader: {
        fontSize: 16,
        font: 'Rubik',
        lineHeight: 1.2,
        color: theme[color].darken,
      },
      info: {
        fontSize: 10,
      },
      'margin-4': { fontSize: 4 },
      'margin-8': { fontSize: 8 },
      'margin-16': { fontSize: 16 },
      bio: {
        fontSize: 10,
      },
      strong: {
        bold: true,
        fontSize: 10,
      },
      social: {
        fontSize: 9,
      },
      small: {
        fontSize: 9,
        color: 'grey',
      },
      content: {
        fontSize: 9,
      },
      link: {
        decoration: 'underline',
      },
    },
  });

  return creation;
};

export default generate;
