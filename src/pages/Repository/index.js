import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Filters } from './styles';

function Repository({ match }) {
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState({});
    const [loading, setLoading] = useState(true);

    const repositoryName = decodeURIComponent(match.params.repo);

    useEffect(() => {
        async function fetchApi() {
            try {
                const [repo, repoIssues] = await Promise.all([
                    api.get(`repos/${repositoryName}`),
                    api.get(`repos/${repositoryName}/issues`, {
                        params: {
                            state: 'open',
                            per_page: 5,
                        },
                    }),
                ]);

                setRepository(repo.data);
                setIssues(repoIssues.data);
                setLoading(false);
            } catch {
                //
            }
        }
        fetchApi();
    });

    if (loading) {
        return <Loading>Carregando...</Loading>;
    }

    return (
        <Container>
            <Owner>
                <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>

            <Filters>
                <li>All</li>
                <li>Open</li>
                <li>Closed</li>
            </Filters>

            <IssueList>
                {issues.map((issue) => (
                    <li key={String(issue.id)}>
                        <img
                            src={issue.user.avatar_url}
                            alt={issue.user.login}
                        />

                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map((label) => (
                                    <span key={String(label.id)}>
                                        {label.name}
                                    </span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssueList>
        </Container>
    );
}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            repo: PropTypes.string,
        }),
    }).isRequired,
};

export default Repository;
