import {OctokitType, SingleSelectOption} from '../src/type';

type GetProjectFieldResponse = {
  node: {
    fields: {
      nodes: {
        id: string;
        name: string;
        options: SingleSelectOption[];
      }[];
    };
  };
};

export async function getProjectFieldId(
  octokit: OctokitType,
  token: string,
  projectId: string,
): Promise<{fieldId: string; options: SingleSelectOption[]}> {
  const query = `
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          fields(first: 50) {
            nodes {
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await octokit.graphql<GetProjectFieldResponse>(query, {
    projectId,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const {nodes: fields} = response.node.fields;
  const specificField = fields.find(field => field.name === 'Status');

  if (!specificField) {
    throw new Error("'Status' 필드를 찾을 수 없습니다.");
  }

  return {
    fieldId: specificField.id,
    options: specificField.options,
  };
}
