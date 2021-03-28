import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { MdDelete as DeleteIcon, MdEdit as EditIcon } from 'react-icons/md';

import Button from '../Button';
import Input from '../Input';
import Tooltip from '../Tooltip';

import { taskApi, projectApi } from '../../services'

import * as S from './styles';

function Project({ projectId, name, tasks, onRemove }) {
  const [todos, setTodos] = useState([]);
  const [dones, setDones] = useState([]);

  useEffect(() => {
    setTodos(tasks.filter((t) => !t.isFinished));
    setDones(tasks.filter((t) => !!t.isFinished));
  }, [tasks]);

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: { description: '' },
  });

  const onSubmit = async (formData) => {
    await taskApi.create({ ...formData }, projectId);
    const { data } = await projectApi.read();
    const { tasks } = data.find(e => e.projectId === projectId);
    setTodos((state) => [...state, tasks[tasks.length - 1]]);
    reset();
  };

  const handleRemoveProject = async () => {
    await projectApi.delete(projectId);
    onRemove(projectId);
  };

  const handleFinishTask = (id) => async () => {
    try {
      await taskApi.update({ isFinished: true, finishedAt: new Date().toISOString() }, id);
      const task = todos.find((t) => t.taskId === id);
      task.isFinished = true;
      task.finishedAt = new Date().toISOString();
      setTodos((state) => state.filter((t) => t.taskId !== id));
      setDones((state) => [...state, task]);
    } catch (err) {
      setTodos((state) => [...state]);
      setDones((state) => [...state]);
    }
  };

  const handleUnfinishTask = (id) => async () => {
    try {
      await taskApi.update({ isFinished: false }, id);
      const task = dones.find((t) => t.taskId === id);
      task.isFinished = false;
      task.finishedAt = null;
      setDones((state) => state.filter((t) => t.taskId !== id));
      setTodos((state) => [...state, task]);
    } catch (err) {
      setDones((state) => [...state]);
      setTodos((state) => [...state]);
    }
  };

  const handleRemoveTask = (id) => async () => {
    await taskApi.delete(id);
    setTodos((state) => state.filter((t) => t.taskId !== id));
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderTitle>{name}</S.HeaderTitle>

        <S.HeaderActions>
          <S.IconButton color="black" title="Edit project" as={Link} to={`/projects/${projectId}/edit`}>
            <EditIcon />
          </S.IconButton>

          <S.IconButton color="black" title="Remove project" onClick={handleRemoveProject}>
            <DeleteIcon />
          </S.IconButton>
        </S.HeaderActions>
      </S.Header>

      <S.ContentWrapper>
        <S.Content>
          <S.ContentTitle>To Do</S.ContentTitle>
          {todos.map((task) => (
            <S.ContentItemWrapper key={task.taskId}>
              <S.Checkbox onChange={handleFinishTask(task.taskId)} />
              <S.Label>
                <Link to={`/tasks/${task.taskId}/edit`}>{task.name}</Link>
              </S.Label>

              <S.ButtonWrapper>
                <S.IconButton size="small" title="Remove task" onClick={handleRemoveTask(task.taskId)}>
                  <DeleteIcon />
                </S.IconButton>
              </S.ButtonWrapper>
            </S.ContentItemWrapper>
          ))}
        </S.Content>

        <S.Content>
          {dones.length > 0 && <S.ContentTitle>Done</S.ContentTitle>}
          {dones.map((task) => (
            <S.ContentItemWrapper key={task.taskId}>
              <S.Checkbox checked onChange={handleUnfinishTask(task.taskId)} />
              <S.Label>
                <Tooltip title={new Date(task.finishedAt).toLocaleString()}>{task.name}</Tooltip>
              </S.Label>
            </S.ContentItemWrapper>
          ))}
        </S.Content>
      </S.ContentWrapper>

      <S.Divider />

      <S.Footer onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" placeholder="Task" ref={register({ required: true })} error={!!errors.error} />
        <Button type="submit">Add</Button>
      </S.Footer>
    </S.Wrapper>
  );
}

export default Project;
