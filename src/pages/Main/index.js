import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import Container from '../../components/Container';
import { Form, SubmitButton, List, ErrorText } from './styles';

import api from '../../services/api';

export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        const repos = localStorage.getItem('repositories');
        if (repos) {
            setRepositories(JSON.parse(repos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('repositories', JSON.stringify(repositories));
    }, [repositories]);

    useEffect(() => {
        setApiError(false);
    }, [newRepo]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setApiError(false);
        try {
            const repoRepeated = repositories.filter(
                (repo) => repo.name.toUpperCase() === newRepo.toUpperCase()
            );
            if (repoRepeated[0]) {
                // the new incoming repo already exists in repositories array
                throw new Error('Repository already exists.');
            }

            const response = await api.get(`repos/${newRepo}`);

            const data = {
                name: response.data.full_name,
            };

            setRepositories([...repositories, data]);
            setNewRepo('');
        } catch (err) {
            setApiError(true);
            console.log(err);
        }
        setLoading(false);
    }

    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositórios
            </h1>

            <Form onSubmit={handleSubmit} error={apiError}>
                <input
                    type="text"
                    placeholder="Adicionar repositório"
                    value={newRepo}
                    onChange={(e) => {
                        setNewRepo(e.target.value);
                    }}
                />

                <SubmitButton loading={loading}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>

            {apiError && (
                <ErrorText> Repostiório inválido, tente novamente.</ErrorText>
            )}

            <List>
                {repositories.map((repository) => (
                    <li key={repository.name}>
                        {repository.name}
                        <Link
                            to={`/repository/${encodeURIComponent(
                                repository.name
                            )}`}
                        >
                            Detalhes
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    );
}
