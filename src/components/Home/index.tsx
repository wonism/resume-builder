import React, { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Document, Page } from 'react-pdf';
import {
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
  Button,
  Input,
  Textarea,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Divider,
  Box,
  Image,
} from '@chakra-ui/core';
import { css } from '@emotion/core';
import equal from 'fast-deep-equal';

import { RequestStatus } from '@models/common';
import { ResumeBody } from '@models/resume';
import useBuild from '@hooks/useBuild';
import useDownload from '@hooks/useDownload';
import { fileToBase64 } from '@utils/data';
import { visuallyHidden } from '@constants/styles';
import { key } from '@constants/storage';
import sample from '@constants/sample';

const initialData: ResumeBody = {
  type: 'default',
  color: 'purple',
  firstName: 'John',
  lastName: 'Doe',
  bio: '',
  socialMedias: [{ type: 'github', id: '' }],
  experiences: [{ company: '', role: '', location: '', startDate: '', endDate: '', description: '', link: '' }],
  organizations: [{ title: '', location: '', startDate: '', endDate: '', description: '', link: '' }],
  educations: [{ schoolName: '', schoolLocation: '', startDate: '', endDate: '', gpa: '', degree: '' }],
  certifications: [{ certificationName: '', date: '' }],
  skills: [{ skillName: '', rate: 0 }],
  languages: [{ language: '', proficiency: '' }],
};

const getInitialData = (): ResumeBody => {
  try {
    const storedData = localStorage.getItem(key);

    if (storedData != null) {
      const parsedStoredData = JSON.parse(storedData);

      if (equal(parsedStoredData, sample)) {
        return initialData;
      }

      return parsedStoredData;
    }

    return initialData;
  } catch (e) {
    return initialData;
  }
};

const FormComponent = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('scroll-lock');

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, []);

  const submitButton$ = useRef<HTMLButtonElement>(null);

  const handleBlur = useCallback(() => {
    submitButton$.current?.click();
  }, []);

  const [downloadRequested, setDownloadRequested] = useState<boolean>(false);

  const data = getInitialData();

  useEffect(() => {
    submitButton$.current?.click();
  }, []);

  useEffect(() => {
    if (data?.profile != null) {
      setProfile(data.profile);
    }
  }, [data]);

  const [body, setBody] = useState<ResumeBody | null>(null);
  const [resume, resumeStatus] = useBuild(body);

  useEffect(() => {
    console.log({ resume, resumeStatus });
  }, [resume, resumeStatus]);

  useDownload(body, downloadRequested, setDownloadRequested);

  const [profile, setProfile] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (data?.profile != null) {
      setProfile(data.profile);
    }
  }, [data]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files?.[0] != null) {
      const encoded = await fileToBase64(files[0]);
      setProfile(encoded);
      submitButton$.current?.click();
    }
  }, []);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);

  const handleLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  const handlePrevPage = useCallback(() => {
    setPageNumber(num => Math.max(num - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPageNumber(num => Math.min(num + 1, numPages));
  }, [numPages]);

  return (
    <Box d="flex" alignItems="start" w="100%">
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          setBody({ ...values, profile });
        }}
        children={({ values, ...other }) => {
          return (
            <Box px={4} w="320px" h="calc(100vh - 9.75rem)" css={css`overflow-y: auto;`}>
              <Form action="/pdf" method="POST">
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel as="legend" fontSize="xl" pb={2}>
                      Resume Options
                    </FormLabel>
                    <FormLabel htmlFor="type">
                      Theme
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Select} variant="flushed" focusBorderColor="blue.500" name="type" id="type">
                      <option value="default">Default</option>
                      {/*
                      <option value="bi-column">Bi Column</option>
                      */}
                    </Field>
                    <br />
                    <FormLabel htmlFor="color">
                      Color
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Select} variant="flushed" focusBorderColor="blue.500" name="color" id="color">
                      <option value="purple">Purple</option>
                      <option value="red">Red</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                    </Field>
                  </Box>
                </FormControl>
                <Divider border="none !important" p={2} />
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel as="legend" fontSize="xl" pb={2}>
                      Personal Information
                    </FormLabel>
                    <FormLabel htmlFor="first-name">
                      First Name
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name="firstName" id="first-name" placeholder="John" />
                    <br />
                    <FormLabel htmlFor="last-name">
                      Last Name
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name="lastName" id="last-name" placeholder="Doe" />
                    <br />
                    <FormLabel htmlFor="bio">
                      Bio
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Textarea} variant="flushed" focusBorderColor="blue.500" name="bio" id="bio" placeholder={`I have over 5 years of experience as a software developer.\n......`} />
                    <br />
                    <FormLabel htmlFor="phone-number">
                      Phone Number
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="tel" name="phoneNumber" id="phone-number" placeholder="+82 10 0000 0000" />
                    <br />
                    <FormLabel htmlFor="email">
                      Email
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="email" name="email" id="email" aria-describedby="email-description" placeholder="my@address.email" />
                    <FormHelperText id="email-description" color="red.500">
                      We'll never share your email.
                    </FormHelperText>
                    <br />
                    <FormLabel htmlFor="city">
                      City
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name="city" id="city" placeholder="Seoul" />
                    <br />
                    <FormLabel htmlFor="country">
                      Country
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name="country" id="country" placeholder="South Korea" />
                    <br />
                    <FormLabel htmlFor="homepage">
                      Homepage
                    </FormLabel>
                    <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name="homepage" id="homepage" placeholder="https://your.homepage" />
                  </Box>
                </FormControl>
                <Divider border="none !important" p={2} />
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel as="legend" fontSize="xl" pb={2}>
                      Social Media
                    </FormLabel>
                    <FieldArray
                      name="socialMedias"
                      render={arrayHelpers => (
                        <>
                          {values.socialMedias.map((_, index) => (
                            <React.Fragment key={index}>
                              {index !== 0 ? (
                                <Divider border="none !important" p={1} />
                              ) : null}
                              <Heading as="h2" size="sm" fontWeight={500} pb={2}>
                                Social Media #{index + 1}
                                {index !== 0 ? (
                                  <IconButton ml={2} size="sm" icon="delete" aria-label="Remove Social Media" variantColor="blue" type="button" onClick={() => { arrayHelpers.remove(index); }} />
                                ) : null}
                              </Heading>
                              <FormLabel htmlFor={`social-medias[${index}].type`}>
                                Social Media
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Select} variant="flushed" focusBorderColor="blue.500" name={`socialMedias[${index}].type`} id={`social-medias[${index}].type`}>
                                <option value="github">Github</option>
                                <option value="behance">Behance</option>
                                <option value="dribbble">Dribbble</option>
                                <option value="facebook">Facebook</option>
                                <option value="instagram">Instagram</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="pinterest">Pinterest</option>
                                <option value="tumblr">Tumblr</option>
                                <option value="twitter">Twitter</option>
                                <option value="youtube">Youtube</option>
                              </Field>
                              <br />
                              <FormLabel htmlFor={`social-medias[${index}].id`}>
                                ID
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" name={`socialMedias[${index}].id`} id={`social-medias[${index}].id`} placeholder="ID" />
                            </React.Fragment>
                          ))}
                          <Divider border="none !important" p={1} />
                          <Button
                            size="sm"
                            variantColor="blue"
                            type="button"
                            leftIcon="add"
                            onClick={() => {
                              arrayHelpers.insert(values.socialMedias.length, initialData.socialMedias[0]);
                            }}
                          >
                            Add
                          </Button>
                        </>
                      )}
                    />
                  </Box>
                </FormControl>
                <Divider border="none !important" p={2} />
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel as="legend" fontSize="xl" pb={2}>
                      Experience
                    </FormLabel>
                    <FieldArray
                      name="experiences"
                      render={arrayHelpers => (
                        <>
                          {values.experiences.map((_, index) => (
                            <React.Fragment key={index}>
                              {index !== 0 ? (
                                <Divider border="none !important" p={1} />
                              ) : null}
                              <Heading as="h2" size="sm" fontWeight={500} pb={2}>
                                Experience #{index + 1}
                                {index !== 0 ? (
                                  <IconButton ml={2} size="sm" icon="delete" aria-label="Remove Experience" variantColor="blue" type="button" onClick={() => { arrayHelpers.remove(index); }} />
                                ) : null}
                              </Heading>
                              <FormLabel htmlFor={`experiences[${index}].company`}>
                                Company
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`experiences[${index}].company`} id={`experiences[${index}].company`} placeholder="Name of your company" />
                              <br />
                              <FormLabel htmlFor={`experiences[${index}].role`}>
                                Role
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`experiences[${index}].role`} id={`experiences[${index}].role`} placeholder="Frontend Developer" />
                              <br />
                              <FormLabel htmlFor={`experiences[${index}].location`}>
                                Location
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`experiences[${index}].location`} id={`experiences[${index}].location`} placeholder="Seoul" />
                              <br />
                              <FormLabel htmlFor={`experiences[${index}].start-date`}>
                                Start Date
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`experiences[${index}].startDate`} id={`experiences[${index}].start-date`} placeholder="January 10, 2020" />
                              <br />
                              <FormLabel htmlFor={`experiences[${index}].end-date`}>
                                End Date
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`experiences[${index}].endDate`} id={`experiences[${index}].end-date`} placeholder="Present" />
                              <br />
                              <FormLabel htmlFor={`experiences[${index}].description`}>
                                Description
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Textarea} variant="flushed" focusBorderColor="blue.500" name={`experiences[${index}].description`} id={`experiences[${index}].description`} placeholder={`Describe your experiences\n......`} />
                              <br />
                              <FormLabel htmlFor={`experiences[${index}].link`}>
                                Link
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`experiences[${index}].link`} id={`experiences[${index}].link`} placeholder="https://your.work" />
                            </React.Fragment>
                          ))}
                          <Divider border="none !important" p={1} />
                          <Button
                            size="sm"
                            variantColor="blue"
                            type="button"
                            leftIcon="add"
                            onClick={() => {
                              arrayHelpers.insert(values.experiences.length, initialData.experiences[0]);
                            }}
                          >
                            Add
                          </Button>
                        </>
                      )}
                    />
                  </Box>
                </FormControl>
                <Divider border="none !important" p={2} />
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel as="legend" fontSize="xl" pb={2}>
                      Organizations
                    </FormLabel>
                    <FieldArray
                      name="organizations"
                      render={arrayHelpers => (
                        <>
                          {values.organizations.map((_, index) => (
                            <React.Fragment key={index}>
                              {index !== 0 ? (
                                <Divider border="none !important" p={1} />
                              ) : null}
                              <Heading as="h2" size="sm" fontWeight={500} pb={2}>
                                Organization #{index + 1}
                                {index !== 0 ? (
                                  <IconButton ml={2} size="sm" icon="delete" aria-label="Remove Organization" variantColor="blue" type="button" onClick={() => { arrayHelpers.remove(index); }} />
                                ) : null}
                              </Heading>
                              <FormLabel htmlFor={`organizations[${index}].title`}>
                                Title
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`organizations[${index}].title`} id={`organizations[${index}].title`} placeholder="Name of organization" />
                              <br />
                              <FormLabel htmlFor={`organizations[${index}].location`}>
                                Location
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`organizations[${index}].location`} id={`organizations[${index}].location`} placeholder="Seoul" />
                              <br />
                              <FormLabel htmlFor={`organizations[${index}].start-date`}>
                                Start Date
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`organizations[${index}].startDate`} id={`organizations[${index}].start-date`} placeholder="Date" />
                              <br />
                              <FormLabel htmlFor={`organizations[${index}].end-date`}>
                                End Date
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`organizations[${index}].endDate`} id={`organizations[${index}].end-date`} placeholder="Date" />
                              <br />
                              <FormLabel htmlFor={`organizations[${index}].description`}>
                                Description
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Textarea} variant="flushed" focusBorderColor="blue.500" name={`organizations[${index}].description`} id={`organizations[${index}].description`} placeholder={`Describe your organization\n......`} />
                              <br />
                              <FormLabel htmlFor={`organizations[${index}].link`}>
                                Link
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`organizations[${index}].link`} id={`organizations[${index}].link`} placeholder="https://organization.com" />
                            </React.Fragment>
                          ))}
                          <Divider border="none !important" p={1} />
                          <Button
                            size="sm"
                            variantColor="blue"
                            type="button"
                            leftIcon="add"
                            onClick={() => {
                              arrayHelpers.insert(values.organizations.length, initialData.organizations[0]);
                            }}
                          >
                            Add
                          </Button>
                        </>
                      )}
                    />
                  </Box>
                </FormControl>
                <Divider border="none !important" p={2} />
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel as="legend" fontSize="xl" pb={2}>
                      Educations
                    </FormLabel>
                    <FieldArray
                      name="educations"
                      render={arrayHelpers => (
                        <>
                          {values.educations.map((_, index) => (
                            <React.Fragment key={index}>
                              {index !== 0 ? (
                                <Divider border="none !important" p={1} />
                              ) : null}
                              <Heading as="h2" size="sm" fontWeight={500} pb={2}>
                                Education #{index + 1}
                                {index !== 0 ? (
                                  <IconButton ml={2} size="sm" icon="delete" aria-label="Remove Education" variantColor="blue" type="button" onClick={() => { arrayHelpers.remove(index); }} />
                                ) : null}
                              </Heading>
                              <FormLabel htmlFor={`educations[${index}].school-name`}>
                                School
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`educations[${index}].schoolName`} id={`educations[${index}].school-name`} placeholder="Seoul Univ." />
                              <br />
                              <FormLabel htmlFor={`educations[${index}].school-location`}>
                                Location
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`educations[${index}].schoolLocation`} id={`educations[${index}].school-location`} placeholder="Seoul" />
                              <br />
                              <FormLabel htmlFor={`educations[${index}].start-date`}>
                                Start Date
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`educations[${index}].startDate`} id={`educations[${index}].start-date`} placeholder="Date" />
                              <br />
                              <FormLabel htmlFor={`educations[${index}].end-date`}>
                                End Date
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`educations[${index}].endDate`} id={`educations[${index}].end-date`} placeholder="Date" />
                              <br />
                              <FormLabel htmlFor={`educations[${index}].gpa`}>
                                GPA
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`educations[${index}].gpa`} id={`educations[${index}].gpa`} placeholder="3.5/4.5" />
                              <br />
                              <FormLabel htmlFor={`educations[${index}].degree`}>
                                Degree
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`educations[${index}].degree`} id={`educations[${index}].degree`} placeholder="Computer Science Engineering" />
                            </React.Fragment>
                          ))}
                          <Divider border="none !important" p={1} />
                          <Button
                            size="sm"
                            variantColor="blue"
                            type="button"
                            leftIcon="add"
                            onClick={() => {
                              arrayHelpers.insert(values.educations.length, initialData.educations[0]);
                            }}
                          >
                            Add
                          </Button>
                        </>
                      )}
                    />
                  </Box>
                </FormControl>
                <Divider border="none !important" p={2} />
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel as="legend" fontSize="xl" pb={2}>
                      Certifications
                    </FormLabel>
                    <FieldArray
                      name="certifications"
                      render={arrayHelpers => (
                        <>
                          {values.certifications.map((_, index) => (
                            <React.Fragment key={index}>
                              {index !== 0 ? (
                                <Divider border="none !important" p={1} />
                              ) : null}
                              <Heading as="h2" size="sm" fontWeight={500} pb={2}>
                                Certification #{index + 1}
                                {index !== 0 ? (
                                  <IconButton ml={2} size="sm" icon="delete" aria-label="Remove Certification" variantColor="blue" type="button" onClick={() => { arrayHelpers.remove(index); }} />
                                ) : null}
                              </Heading>
                              <FormLabel htmlFor={`certifications[${index}].certificationName`}>
                                Certification
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`certifications[${index}].certificationName`} id={`certifications[${index}].certificationName`} placeholder="Certification" />
                              <br />
                              <FormLabel htmlFor={`certifications[${index}].date`}>
                                Date
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`certifications[${index}].date`} id={`certifications[${index}].date`} placeholder="Date" />
                            </React.Fragment>
                          ))}
                          <Divider border="none !important" p={1} />
                          <Button
                            size="sm"
                            variantColor="blue"
                            type="button"
                            leftIcon="add"
                            onClick={() => {
                              arrayHelpers.insert(values.certifications.length, initialData.certifications[0]);
                            }}
                          >
                            Add
                          </Button>
                        </>
                      )}
                    />
                  </Box>
                </FormControl>
                <Divider border="none !important" p={2} />
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel as="legend" fontSize="xl" pb={2}>
                      Skills
                    </FormLabel>
                    <FieldArray
                      name="skills"
                      render={arrayHelpers => (
                        <>
                          {values.skills.map((_, index) => (
                            <React.Fragment key={index}>
                              {index !== 0 ? (
                                <Divider border="none !important" p={1} />
                              ) : null}
                              <Heading as="h2" size="sm" fontWeight={500} pb={2}>
                                Skill #{index + 1}
                                {index !== 0 ? (
                                  <IconButton ml={2} size="sm" icon="delete" aria-label="Remove Skill" variantColor="blue" type="button" onClick={() => { arrayHelpers.remove(index); }} />
                                ) : null}
                              </Heading>
                              <FormLabel htmlFor={`skills[${index}].skill-name`}>
                                Skill
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`skills[${index}].skillName`} id={`skills[${index}].skill-name`} placeholder="Programming" />
                              <br />
                              <FormLabel as="span">
                                Rate
                              </FormLabel>
                              <Slider defaultValue={5} name={`skills[${index}].rate`} id={`skills[${index}].rate`} min={0} max={10}>
                                <SliderTrack bg="blue.100" />
                                <SliderFilledTrack bg="blue.500" />
                                <SliderThumb size={6} />
                              </Slider>
                            </React.Fragment>
                          ))}
                          <Divider border="none !important" p={1} />
                          <Button
                            size="sm"
                            variantColor="blue"
                            type="button"
                            leftIcon="add"
                            onClick={() => {
                              arrayHelpers.insert(values.skills.length, initialData.skills[0]);
                            }}
                          >
                            Add
                          </Button>
                        </>
                      )}
                    />
                  </Box>
                </FormControl>
                <Divider border="none !important" p={2} />
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel as="legend" fontSize="xl" pb={2}>
                      Languages
                    </FormLabel>
                    <FieldArray
                      name="languages"
                      render={arrayHelpers => (
                        <>
                          {values.languages.map((_, index) => (
                            <React.Fragment key={index}>
                              {index !== 0 ? (
                                <Divider border="none !important" p={1} />
                              ) : null}
                              <Heading as="h2" size="sm" fontWeight={500} pb={2}>
                                Language #{index + 1}
                                {index !== 0 ? (
                                  <IconButton ml={2} size="sm" icon="delete" aria-label="Remove Language" variantColor="blue" type="button" onClick={() => { arrayHelpers.remove(index); }} />
                                ) : null}
                              </Heading>
                              <FormLabel htmlFor={`languages[${index}].language`}>
                                Language
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`languages[${index}].language`} id={`languages[${index}].language`} placeholder="English" />
                              <br />
                              <FormLabel htmlFor={`languages[${index}].proficiency`}>
                                Proficiency
                              </FormLabel>
                              <Field onBlur={handleBlur} as={Input} variant="flushed" focusBorderColor="blue.500" type="text" name={`languages[${index}].proficiency`} id={`languages[${index}].proficiency`} placeholder="Native" />
                            </React.Fragment>
                          ))}
                          <Divider border="none !important" p={1} />
                          <Button
                            size="sm"
                            variantColor="blue"
                            type="button"
                            leftIcon="add"
                            onClick={() => {
                              arrayHelpers.insert(values.languages.length, initialData.languages[0]);
                            }}
                          >
                            Add
                          </Button>
                        </>
                      )}
                    />
                  </Box>
                </FormControl>
                <Divider border="none !important" p={2} />
                <FormControl as="fieldset" role={undefined}>
                  <Box p={5} shadow="md" rounded="md" borderWidth="1px">
                    <FormLabel htmlFor="profile-file" fontSize="xl" pb={2}>
                      Photo
                    </FormLabel>
                    <input type="hidden" name="profile" id="profile" value={profile} />
                    <Input
                      type="file"
                      variant="flushed"
                      accept="image/jpeg, image/png"
                      id="profile-file"
                      onChange={handleFileChange}
                      capture="user"
                    />
                    {profile != null ? (
                      <>
                        <Box w="240px" mt={5} borderWidth="1px" rounded="lg" overflow="hidden" css={css`position: relative;`}>
                          <Image size="240px" src={profile} alt="profile" />
                          <IconButton size="sm" icon="close" aria-label="Remove Profile" variantColor="blue" type="button" onClick={() => { setProfile(undefined); }} css={css` position: absolute; top: 4px; right: 4px;`} />
                        </Box>
                      </>
                    ) : null}
                  </Box>
                </FormControl>
                <Button ref={submitButton$} leftIcon="check" variantColor="blue" type="submit" isLoading={resumeStatus === RequestStatus.SENT} css={visuallyHidden}>
                  Submit
                </Button>
              </Form>
            </Box>
          );
        }}
      />
      <Box px={4} flex={1} h="calc(100vh - 9.75rem)" css={css`overflow-y: auto;`}>
        {resume != null ? (
          <>
            <Button leftIcon="download" variantColor="blue" type="button" onClick={() => { setDownloadRequested(true); }}>
              Download
            </Button>
            <Button ml="4" leftIcon="delete" variantColor="red" type="button" onClick={() => { localStorage.removeItem(key); document.location.reload(); }}>
              Reset Data
            </Button>
            <Button ml="4" leftIcon="view" variantColor="green" type="button" onClick={() => { setBody(sample as ResumeBody); }}>
              Sample
            </Button>
            <br />
            <br />
            {numPages !== 1 ? (
              <>
                <IconButton aria-label="Previous page" icon="arrow-left" variantColor="blue" onClick={handlePrevPage} isDisabled={pageNumber === 1} />
                <IconButton ml="4" aria-label="Next page" icon="arrow-right" variantColor="blue" onClick={handleNextPage} isDisabled={pageNumber === numPages} />
              </>
            ) : null}
            <Document file={resume} onLoadSuccess={handleLoadSuccess} css={css`position: relative;`} loading={(<Box>Building Resume...⚒</Box>)}>
              <Page pageNumber={pageNumber} loading={(<Box>Page Loading...</Box>)} />
            </Document>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default FormComponent;
