import NextLink from 'next/link';
import { Box, ButtonBase, Stack } from '@mui/material';

export function PagesPopover({sections}) {
  return <Box
    sx={{
      display: 'grid',
      gap: 3,
      gridTemplateColumns: `repeat(${sections.length}, 1fr)`,
      p: 3
    }}
  >
    {sections.map((section, index) => {
      return (
        <Stack
          component="ul"
          key={index}
          spacing={0.5}
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0
          }}
        >
          {section.items.map((item) => {
            let linkProps;

            if (item.path) {
              const isExternal = item.path.startsWith('http');

              linkProps = isExternal
                ? {
                  component: 'a',
                  href: item.path,
                  target: '_blank'
                }
                : {
                  component: NextLink,
                  href: item.path
                };
            }

            return (
              <li key={item.title}>
                <ButtonBase
                  sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    px: '12px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                  {...linkProps}>
                  <Box
                    component="span"
                    sx={{
                      alignItems: 'center',
                      color: 'action.active',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      mr: 2,
                      width: 20
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box
                    component="span"
                    sx={{ flexGrow: 1 }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'block',
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {item.title}
                    </Box>
                    {item.caption ? <Box
                        component="span"
                        sx={{
                          color: 'text.secondary',
                          display: 'block',
                          fontFamily: (theme) => theme.typography.fontFamily,
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: '18px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.caption}
                      </Box> : null}
                  </Box>
                </ButtonBase>
                {item.children ? <Stack
                    component="ul"
                    spacing={0.5}
                    sx={{
                      listStyle: 'none',
                      m: 0,
                      p: 0,
                      pl: `${20 + 16  }px` // icon size + icon margin
                    }}
                  >
                    {item.children.map((child) => {
                      let linkProps;

                      if (child.path) {
                        const isExternal = child.path.startsWith('http');

                        linkProps = isExternal
                          ? {
                            component: 'a',
                            href: child.path,
                            target: '_blank'
                          }
                          : {
                            component: NextLink,
                            href: child.path
                          };
                      }

                      return (
                        <li key={child.title}>
                          <ButtonBase
                            sx={{
                              alignItems: 'center',
                              borderRadius: 1,
                              display: 'flex',
                              justifyContent: 'flex-start',
                              px: '12px',
                              py: '6px',
                              textAlign: 'left',
                              width: '100%',
                              '&:hover': {
                                backgroundColor: 'action.hover'
                              }
                            }}
                            {...linkProps}>
                            <Box
                              component="span"
                              sx={{
                                color: 'text.secondary',
                                display: 'block',
                                fontFamily: (theme) => theme.typography.fontFamily,
                                fontSize: 14,
                                fontWeight: 500,
                                lineHeight: '24px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {child.title}
                            </Box>
                          </ButtonBase>
                        </li>
                      );
                    })}
                  </Stack> : null}
              </li>
            );
          })}
        </Stack>
      );
    })}
  </Box>
}
